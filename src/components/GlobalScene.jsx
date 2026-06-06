import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import SceneBoundary from './SceneBoundary.jsx';

// Persistent 3D scene that lives behind every section.
// Lightweight by design: MeshStandardMaterial + emissive (no multi-pass
// transmission, no Edges, no Float wrappers). Inline geometry per crystal
// so React doesn't tear down + re-mount the geometry between frames.

const NEON = ['#00F0FF', '#FF2E97', '#9B5DE5', '#B6FF3C', '#FFD24A', '#7C5BFF'];
const CRYSTAL_COUNT = 6;

const makeGeometry = (shapeId) => {
  switch (shapeId) {
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

const Crystal = ({ index, scrollRef, scrollVelRef }) => {
  const ref = useRef();
  const color = NEON[index % NEON.length];
  const seed = useMemo(
    () => ({
      a: Math.random() * Math.PI * 2,
      r: 2.5 + Math.random() * 2.5,
      h: (Math.random() - 0.5) * 4,
      speed: 0.6 + Math.random() * 0.8,
      shape: Math.floor(Math.random() * 5),
      bobPhase: Math.random() * Math.PI * 2,
    }),
    []
  );

  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const s = scrollRef.current;
    const v = scrollVelRef.current;

    const section = Math.min(5, Math.floor(s * 5));
    const f = s * 5 - section;

    const ringR = 4;
    const angle = (index / CRYSTAL_COUNT) * Math.PI * 2 + t * 0.15 * seed.speed;

    const formations = [
      // cluster
      [Math.cos(seed.a) * seed.r, seed.h, Math.sin(seed.a) * seed.r],
      // orbit ring
      [Math.cos(angle) * ringR, Math.sin(angle * 0.5) * 0.6, Math.sin(angle) * ringR],
      // parade line
      [(index - (CRYSTAL_COUNT - 1) / 2) * 1.6, Math.sin(t * 1.2 + index) * 0.3, Math.cos(t * 0.5 + index) * 0.6],
      // helix
      [
        Math.cos((index / CRYSTAL_COUNT) * Math.PI * 4 + t * 0.4) * 3.5,
        (index / CRYSTAL_COUNT - 0.5) * 6,
        Math.sin((index / CRYSTAL_COUNT) * Math.PI * 4 + t * 0.4) * 3.5,
      ],
      // converge
      [Math.cos(angle * 0.8) * 1.2, Math.sin(angle * 0.8) * 1.2, -0.5],
      // explosion
      [Math.cos((index / CRYSTAL_COUNT) * Math.PI * 2) * 7, (index % 2 === 0 ? 1 : -1) * 2.5, Math.sin((index / CRYSTAL_COUNT) * Math.PI * 2) * 7],
    ];

    const a = formations[Math.min(formations.length - 1, section)];
    const b = formations[Math.min(formations.length - 1, section + 1)];
    const tx = a[0] + (b[0] - a[0]) * f;
    const ty = a[1] + (b[1] - a[1]) * f + Math.sin(t * 1.2 + seed.bobPhase) * 0.18;
    const tz = a[2] + (b[2] - a[2]) * f;

    ref.current.position.x += (tx - ref.current.position.x) * 0.08;
    ref.current.position.y += (ty - ref.current.position.y) * 0.08;
    ref.current.position.z += (tz - ref.current.position.z) * 0.08;

    ref.current.rotation.x += dt * 0.25 * seed.speed;
    ref.current.rotation.y += dt * 0.35 * seed.speed;

    const scale = 1 + Math.min(0.35, Math.abs(v) * 80);
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      {makeGeometry(seed.shape)}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.35}
        metalness={0.35}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

const ParticleField = ({ count = 180, scrollRef }) => {
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
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
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
  useFrame((state) => {
    const s = scrollRef.current;
    const cam = state.camera;
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
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FF2E97" />
      <directionalLight position={[-5, 3, -3]} intensity={0.6} color="#00F0FF" />
      <pointLight position={[0, 0, 4]} intensity={1.0} color="#9B5DE5" />

      <ParticleField count={180} scrollRef={scrollRef} />

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
      const max = doc.scrollHeight - window.innerHeight || 1;
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      const dy = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      scrollVelRef.current =
        scrollVelRef.current * 0.85 + (dy / Math.max(window.innerHeight, 1)) * 0.15;
      scrollRef.current += (next - scrollRef.current) * 0.12;
      rafId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="global-scene" aria-hidden>
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 9], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
          <SceneRig scrollRef={scrollRef} scrollVelRef={scrollVelRef} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
};

export default GlobalScene;
