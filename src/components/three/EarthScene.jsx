import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * 3D Golden Luminous Earth and Interconnected Golden Souls
 * Represents the Golden Age (Satyug) / World of Peace where individual souls shine
 * and envelop the planet in waves of supreme peace.
 */
export default function EarthScene() {
  const earthRef = useRef();
  const atmosphereRef = useRef();
  const auraPointsRef = useRef();
  const soulRingRef = useRef();

  // Create dotted grid of continents / surface points
  const [earthDots] = useMemo(() => {
    const pts = [];
    const count = 1400;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.35;

      pts.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }
    return [new Float32Array(pts)];
  }, []);

  // Connected enlightened souls encircling the globe
  const [soulPoints] = useMemo(() => {
    const pts = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 1.8 + Math.sin(i * 3) * 0.15;
      pts.push(
        r * Math.cos(angle),
        Math.sin(angle * 2) * 0.4,
        r * Math.sin(angle)
      );
    }
    return [new Float32Array(pts)];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.03;
      const pulse = 1.0 + Math.sin(time * 1.5) * 0.04;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
    }
    if (soulRingRef.current) {
      soulRingRef.current.rotation.y += delta * 0.12;
      soulRingRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Golden Planet Core */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshStandardMaterial
          color="#0B1020"
          roughness={0.7}
          metalness={0.2}
          emissive="#2A1B4E"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Surface Light Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={earthDots.length / 3}
            array={earthDots}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#E8C77B"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Golden Atmosphere Glow */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.48, 32, 32]} />
        <meshBasicMaterial
          color="#E8C77B"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbiting Ring of Connected Souls of Light */}
      <group ref={soulRingRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={soulPoints.length / 3}
              array={soulPoints}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color="#FFFFFF"
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Golden energy connection line circle */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.78, 1.81, 64]} />
          <meshBasicMaterial
            color="#E8C77B"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Ambient and directional lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#FFE4B5" />
    </group>
  );
}
