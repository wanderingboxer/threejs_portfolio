import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

// One persistent 3D scene that lives behind every section. Scroll drives
// camera and the formation pattern of the floating artifacts.

const NEON = ['#00F0FF', '#FF2E97', '#9B5DE5', '#B6FF3C', '#FFD24A', '#7C5BFF'];

const CRYSTAL_COUNT = 9;

const Crystal = ({ index, scrollRef, scrollVelRef }) => {
  const ref = useRef();
  const color = NEON[index % NEON.length];
  const baseSeed = useMemo(() => ({
    a: Math.random() * Math.PI * 2,
    r: 2.5 + Math.random() * 2.5,
    h: (Math.random() - 0.5) * 4,
    speed: 0.6 + Math.random() * 0.8,
    shape: Math.floor(Math.random() * 5),
  }), []);

  // Geometry by shape index
  const Geometry = () => {
    switch (baseSeed.shape) {
      case 0:
        return <icosahedronGeometry args={[0.9, 0]} />;
      case 1:
        return <octahedronGeometry args={[0.9, 0]} />;
      case 2:
        return <dodecahedronGeometry args={[0.85, 0]} />;
      case 3:
        return <tetrahedronGeometry args={[1, 0]} />;
      default:
        return <torusGeometry args={[0.6, 0.18, 18, 48]} />;
    }
  };

  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = scrollRef.current; // 0..1 global
    const v = scrollVelRef.current; // scroll velocity

    // Per-section formations (5 sections evenly across 0..1)
    // 0: cluster (hero), 0.2: orbit ring, 0.4: line/parade (missions),
    // 0.6: helix (log), 0.8: converge (comms), 1: explosion (footer)
    const section = Math.min(5, Math.floor(s * 5));
    const f = (s * 5) - section;
    const targetPos = new THREE.Vector3();

    const idx = index;
    const ringR = 4;
    const angle = (idx / CRYSTAL_COUNT) * Math.PI * 2 + t * 0.15 * baseSeed.speed;

    // Formation A: cluster (random base positions)
    const clusterX = Math.cos(baseSeed.a) * baseSeed.r;
    const clusterY = baseSeed.h;
    const clusterZ = Math.sin(baseSeed.a) * baseSeed.r;

    // Formation B: orbit ring (rotating)
    const orbX = Math.cos(angle) * ringR;
    const orbY = Math.sin(angle * 0.5) * 0.6;
    const orbZ = Math.sin(angle) * ringR;

    // Formation C: parade line
    const lineX = (idx - (CRYSTAL_COUNT - 1) / 2) * 1.6;
    const lineY = Math.sin(t * 1.2 + idx) * 0.3;
    const lineZ = Math.cos(t * 0.5 + idx) * 0.6;

    // Formation D: helix
    const heliT = idx / CRYSTAL_COUNT;
    const helixX = Math.cos(heliT * Math.PI * 4 + t * 0.4) * 3.5;
    const helixY = (heliT - 0.5) * 6;
    const helixZ = Math.sin(heliT * Math.PI * 4 + t * 0.4) * 3.5;

    // Formation E: converge to a point
    const convX = Math.cos(angle * 0.8) * 1.2;
    const convY = Math.sin(angle * 0.8) * 1.2;
    const convZ = -0.5;

    // Formation F: explosion outward
    const expA = (idx / CRYSTAL_COUNT) * Math.PI * 2;
    const expR = 7;
    const expX = Math.cos(expA) * expR;
    const expY = (idx % 2 === 0 ? 1 : -1) * 2.5;
    const expZ = Math.sin(expA) * expR;

    const formations = [
      [clusterX, clusterY, clusterZ],
      [orbX, orbY, orbZ],
      [lineX, lineY, lineZ],
      [helixX, helixY, helixZ],
      [convX, convY, convZ],
      [expX, expY, expZ],
    ];

    const a = formations[Math.min(formations.length - 1, section)];
    const b = formations[Math.min(formations.length - 1, section + 1)];
    targetPos.set(
      a[0] + (b[0] - a[0]) * f,
      a[1] + (b[1] - a[1]) * f,
      a[2] + (b[2] - a[2]) * f
    );

    // Lerp current to target
    ref.current.position.lerp(targetPos, 0.08);

    // Spin
    ref.current.rotation.x += dt * 0.25 * baseSeed.speed;
    ref.current.rotation.y += dt * 0.35 * baseSeed.speed;

    // Scale pulse on scroll velocity
    const scale = 1 + Math.min(0.35, Math.abs(v) * 80);
    ref.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.9}>
      <mesh ref={ref}>
        <Geometry />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.55}
          roughness={0.05}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.55}
          backside
          samples={4}
          resolution={256}
          distortion={0.3}
          distortionScale={0.4}
          temporalDistortion={0.1}
          attenuationDistance={1.2}
          attenuationColor={color}
        />
        <Edges threshold={15} color={color} />
      </mesh>
    </Float>
  );
};

const ParticleField = ({ count = 380, scrollRef }) => {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00F0FF'),
      new THREE.Color('#FF2E97'),
      new THREE.Color('#9B5DE5'),
      new THREE.Color('#FFD24A'),
      new THREE.Color('#B6FF3C'),
    ];
    for (let i = 0; i < count; i += 1) {
      const r = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  }, [count]);

  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.04;
    ref.current.rotation.x = scrollRef.current * 0.6;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
};

const SceneRig = ({ scrollRef, scrollVelRef }) => {
  // Camera drift
  useFrame((state) => {
    const s = scrollRef.current;
    const cam = state.camera;
    // Slow dolly + sweep based on scroll
    const targetZ = 9 - s * 2.5;
    const targetX = Math.sin(s * Math.PI * 1.5) * 1.4;
    const targetY = Math.cos(s * Math.PI * 2) * 0.8 - s * 0.6;
    cam.position.x += (targetX - cam.position.x) * 0.04;
    cam.position.y += (targetY - cam.position.y) * 0.04;
    cam.position.z += (targetZ - cam.position.z) * 0.04;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#FF2E97" />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#00F0FF" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#9B5DE5" />
      <pointLight position={[0, -4, -2]} intensity={0.6} color="#FFD24A" />

      <ParticleField count={420} scrollRef={scrollRef} />

      {Array.from({ length: CRYSTAL_COUNT }).map((_, i) => (
        <Crystal key={i} index={i} scrollRef={scrollRef} scrollVelRef={scrollVelRef} />
      ))}
    </>
  );
};

const GlobalScene = () => {
  const scrollRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    let rafId;
    const update = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      const dy = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      scrollVelRef.current = scrollVelRef.current * 0.85 + dy / Math.max(window.innerHeight, 1) * 0.15;
      scrollRef.current += (next - scrollRef.current) * 0.12;
      rafId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="global-scene" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ alpha: true, antialias: true }}>
        <SceneRig scrollRef={scrollRef} scrollVelRef={scrollVelRef} />
      </Canvas>
    </div>
  );
};

export default GlobalScene;
