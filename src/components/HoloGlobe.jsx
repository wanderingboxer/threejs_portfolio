import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const latLngToVec3 = (lat, lng, r) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -r * Math.sin(phi) * Math.cos(theta);
  const z = r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const Wireframe = () => {
  const group = useRef();
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.18;
  });

  return (
    <group ref={group}>
      {/* Solid inner sphere */}
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial color="#03050B" transparent opacity={0.85} />
      </mesh>

      {/* Wireframe */}
      <mesh>
        <sphereGeometry args={[1.001, 32, 24]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Outer glow shell */}
      <mesh>
        <sphereGeometry args={[1.06, 32, 24]} />
        <meshBasicMaterial
          color="#00F0FF"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.08, 1.085, 64]} />
        <meshBasicMaterial color="#FF2E97" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>

      {/* Tropic rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.36, 0]}>
        <ringGeometry args={[0.94, 0.943, 64]} />
        <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.36, 0]}>
        <ringGeometry args={[0.94, 0.943, 64]} />
        <meshBasicMaterial color="#00F0FF" side={THREE.DoubleSide} transparent opacity={0.35} />
      </mesh>

      {/* Location marker — Bangalore */}
      <Marker lat={12.9716} lng={77.5946} />
    </group>
  );
};

const Marker = ({ lat, lng }) => {
  const pulse = useRef();
  const pos = useMemo(() => latLngToVec3(lat, lng, 1.02), [lat, lng]);
  const dir = useMemo(() => pos.clone().normalize(), [pos]);
  const beamLen = 0.45;
  const beamMid = pos.clone().add(dir.clone().multiplyScalar(beamLen / 2));
  const beamQuat = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(up, dir);
    return q;
  }, [dir]);

  useFrame(({ clock }) => {
    if (pulse.current) {
      const t = (clock.getElapsedTime() % 1.6) / 1.6;
      pulse.current.scale.setScalar(1 + t * 2.2);
      pulse.current.material.opacity = 0.7 * (1 - t);
    }
  });

  return (
    <group>
      <mesh position={pos}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#FF2E97" />
      </mesh>
      <mesh position={pos} ref={pulse}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#FF2E97" transparent opacity={0.7} />
      </mesh>
      <mesh position={beamMid} quaternion={beamQuat}>
        <cylinderGeometry args={[0.005, 0.005, beamLen, 8]} />
        <meshBasicMaterial color="#FF2E97" transparent opacity={0.55} />
      </mesh>
    </group>
  );
};

const Stars = () => {
  const points = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const N = 200;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i += 1) {
      const r = 4 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return geo;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial color="#7DF9FF" size={0.018} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
};

const HoloGlobe = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <Stars />
        <Wireframe />
      </Canvas>
    </div>
  );
};

export default HoloGlobe;
