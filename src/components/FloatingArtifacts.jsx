import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Edges } from '@react-three/drei';
import * as THREE from 'three';

const NEON = {
  cyan: '#00F0FF',
  magenta: '#FF2E97',
  violet: '#9B5DE5',
  lime: '#B6FF3C',
  gold: '#FFD24A',
  indigo: '#7C5BFF',
};

const Crystal = ({ shape = 'icosa', position, color, scale = 1, speed = 1 }) => {
  const ref = useRef();
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.18 * speed;
    ref.current.rotation.y += dt * 0.28 * speed;
  });

  const Geometry = () => {
    switch (shape) {
      case 'octa':
        return <octahedronGeometry args={[1, 0]} />;
      case 'dodeca':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'tetra':
        return <tetrahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[0.75, 0.18, 24, 64]} />;
      case 'icosa':
      default:
        return <icosahedronGeometry args={[1, 0]} />;
    }
  };

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.25} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <Geometry />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.55}
          roughness={0.05}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.45}
          backside
          samples={4}
          resolution={256}
          distortion={0.25}
          distortionScale={0.4}
          temporalDistortion={0.08}
          attenuationDistance={1.2}
          attenuationColor={color}
        />
        <Edges threshold={15} color={color} />
      </mesh>
    </Float>
  );
};

const ParticleField = ({ count = 220 }) => {
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
      const r = 4 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
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
    if (ref.current) ref.current.rotation.y += dt * 0.04;
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

const Cluster = ({ pointer }) => {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const targetX = (pointer?.current?.x || state.pointer.x) * 0.45;
    const targetY = (pointer?.current?.y || state.pointer.y) * 0.35;
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.06;
    ref.current.rotation.x += (-targetY - ref.current.rotation.x) * 0.06;
  });

  return (
    <group ref={ref}>
      <Crystal shape="icosa" position={[0, 0, 0]} color={NEON.violet} scale={1.5} speed={0.7} />
      <Crystal shape="octa" position={[3.6, 1.2, -1]} color={NEON.cyan} scale={0.75} speed={1.1} />
      <Crystal shape="dodeca" position={[-3.4, -0.8, -1.5]} color={NEON.magenta} scale={0.85} speed={0.9} />
      <Crystal shape="tetra" position={[2.6, -1.8, 1.2]} color={NEON.lime} scale={0.55} speed={1.3} />
      <Crystal shape="torus" position={[-2.6, 1.9, 0.5]} color={NEON.gold} scale={0.6} speed={1.2} />
      <Crystal shape="icosa" position={[0.8, 2.4, -2]} color={NEON.indigo} scale={0.45} speed={1.5} />
    </group>
  );
};

const FloatingArtifacts = () => {
  return (
    <>
      <ParticleField count={260} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#FF2E97" />
      <directionalLight position={[-5, 3, -3]} intensity={0.5} color="#00F0FF" />
      <pointLight position={[0, 0, 4]} intensity={0.7} color="#9B5DE5" />
      <Cluster />
    </>
  );
};

export default FloatingArtifacts;
