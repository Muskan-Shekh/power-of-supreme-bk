import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Rajyoga Meditation Conduit
 * Visualizes the golden stream of peace flowing between Shiv Baba (above) and the meditator's soul (below)
 */
export default function MeditationConduit() {
  const beamRef = useRef();
  const particleStreamRef = useRef();
  const upperSourceRef = useRef();
  const lowerSoulRef = useRef();

  // Vertical light stream particles traveling downwards from Supreme Soul to human soul
  const [particleData, particleCount] = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = radius * Math.cos(angle);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0; // Y from -2.5 to 2.5
      positions[i * 3 + 2] = radius * Math.sin(angle);
      speeds[i] = 1.0 + Math.random() * 2.0;
    }
    return [{ positions, speeds }, count];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Pulse Supreme Soul at top
    if (upperSourceRef.current) {
      const s = 1.0 + Math.sin(time * 3.0) * 0.15;
      upperSourceRef.current.scale.set(s, s, s);
    }

    // Pulse Meditator Soul at bottom
    if (lowerSoulRef.current) {
      const s = 1.0 + Math.sin(time * 2.0) * 0.1;
      lowerSoulRef.current.scale.set(s, s, s);
    }

    // Move particles downward from Shiv Baba to the soul
    if (particleStreamRef.current) {
      const pos = particleStreamRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] -= delta * particleData.speeds[i];
        if (pos[i * 3 + 1] < -2.2) {
          pos[i * 3 + 1] = 2.4;
        }
      }
      particleStreamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Supreme Soul at the top horizon (Paramdham) */}
      <group position={[0, 2.5, 0]}>
        <mesh ref={upperSourceRef}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshBasicMaterial color="#FF4500" />
        </mesh>
        <mesh scale={[1.6, 2.0, 1.0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial
            color="#FFA500"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Core spark */}
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Downward Conduit of Golden Ray (Cylinder) */}
      <mesh ref={beamRef} position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.22, 4.6, 32, 1, true]} />
        <meshBasicMaterial
          color="#E8C77B"
          transparent
          opacity={0.22}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Internal Brilliant Core Stream */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 4.6, 16, 1, true]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Streaming Golden Light Drops */}
      <points ref={particleStreamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particleData.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#FFE4B5"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Receiving Soul at the bottom */}
      <group position={[0, -2.2, 0]}>
        <mesh ref={lowerSoulRef}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh scale={[1.8, 1.8, 1.8]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshBasicMaterial
            color="#9370DB"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Radiating ground ripple */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.25, 0.7, 32]} />
          <meshBasicMaterial
            color="#E8C77B"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
