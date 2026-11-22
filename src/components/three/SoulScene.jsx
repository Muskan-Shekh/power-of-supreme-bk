import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Human Silhouette & Soul Realization
 * Shows an ethereal meditating human form made of sacred light particles,
 * and reveals the radiant soul point (Bhrkuti) between the eyebrows.
 */
export default function SoulScene({ progress = 0 }) {
  const groupRef = useRef();
  const soulPointRef = useRef();
  const soulAuraRef = useRef();
  const wavesRef = useRef();

  // Create human silhouette outline particles (seated in lotus meditation)
  const [silhouettePoints] = useMemo(() => {
    const pts = [];
    
    // Head circle / oval
    for (let i = 0; i < 280; i++) {
      const angle = (i / 280) * Math.PI * 2;
      const r = 0.65 + (Math.random() - 0.5) * 0.08;
      pts.push(
        r * Math.cos(angle) * 0.85,
        1.6 + r * Math.sin(angle) * 1.05,
        (Math.random() - 0.5) * 0.3
      );
    }

    // Forehead / third eye region extra density
    for (let i = 0; i < 90; i++) {
      const theta = Math.random() * Math.PI * 2;
      const rad = Math.random() * 0.18;
      pts.push(
        rad * Math.cos(theta),
        1.72 + rad * Math.sin(theta),
        0.35 + (Math.random() - 0.5) * 0.1
      );
    }

    // Torso & shoulders
    for (let i = 0; i < 650; i++) {
      const y = (Math.random() - 0.5) * 2.0; // from -1.0 to 1.0
      // Shoulder taper
      const widthFactor = y > 0.5 ? (1.0 - (y - 0.5) * 1.2) : (0.8 + (1.0 - Math.abs(y)) * 0.5);
      const x = (Math.random() - 0.5) * 1.8 * widthFactor;
      const z = (Math.random() - 0.5) * 0.6;
      pts.push(x, y + 0.3, z);
    }

    // Crossed meditation legs & base
    for (let i = 0; i < 480; i++) {
      const angle = (i / 480) * Math.PI;
      const r = 1.6 + Math.random() * 0.5;
      const x = r * Math.cos(angle);
      const y = -1.1 + (Math.random() - 0.5) * 0.4;
      const z = (Math.random() - 0.5) * 0.9;
      pts.push(x, y, z);
    }

    return [new Float32Array(pts)];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Gentle breathing float
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.06;
    }

    if (soulPointRef.current) {
      // Radiant star pulse
      const pulse = 1 + Math.sin(time * 3.5) * 0.25;
      soulPointRef.current.scale.set(pulse, pulse, pulse);
    }

    if (soulAuraRef.current) {
      const auraPulse = 1 + Math.sin(time * 2.0) * 0.15;
      soulAuraRef.current.scale.set(auraPulse, auraPulse, auraPulse);
    }

    if (wavesRef.current) {
      // Expanding ripples of pure consciousness
      wavesRef.current.rotation.z += delta * 0.2;
      const s = 1.0 + (time % 2.5) * 0.9;
      wavesRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Meditating Human Form Particle Mesh */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={silhouettePoints.length / 3}
            array={silhouettePoints}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#9370DB"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Soul Point (Star of Light in the forehead) */}
      <group position={[0, 1.72, 0.45]}>
        {/* Core brilliant white spark */}
        <mesh ref={soulPointRef}>
          <sphereGeometry args={[0.07, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>

        {/* Golden-white aura halo */}
        <mesh ref={soulAuraRef}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshBasicMaterial
            color="#E8C77B"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Outer violet energy envelope */}
        <mesh>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial
            color="#9370DB"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Radiant concentric rings representing soul thoughts */}
        <group ref={wavesRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.33, 48]} />
            <meshBasicMaterial
              color="#E8C77B"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.58, 48]} />
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
