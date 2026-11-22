import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Interactive Ring of the Seven Spiritual Qualities
 * Arranged in a sacred circle floating in cosmic space.
 */
export default function SevenQualitiesRing({ qualities, activeQualityId, onSelectQuality }) {
  const groupRef = useRef();
  const radius = 2.4;

  const items = useMemo(() => {
    return qualities.map((q, idx) => {
      const angle = (idx / qualities.length) * Math.PI * 2;
      return {
        ...q,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * 0.45,
        z: Math.sin(angle) * radius,
        angle
      };
    });
  }, [qualities]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Radiance */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Orbit Ring Line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial
          color="#E8C77B"
          transparent
          opacity={0.25}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Floating Quality Orbs */}
      {items.map((item) => {
        const isActive = activeQualityId === item.id;
        return (
          <group
            key={item.id}
            position={[item.x, item.y, item.z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectQuality(item.id);
            }}
          >
            {/* Core Gem Orb */}
            <mesh scale={isActive ? [1.4, 1.4, 1.4] : [1, 1, 1]}>
              <sphereGeometry args={[0.22, 24, 24]} />
              <meshStandardMaterial
                color={item.color}
                emissive={item.color}
                emissiveIntensity={isActive ? 1.4 : 0.6}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Glowing outer halo */}
            <mesh scale={isActive ? [1.9, 1.9, 1.9] : [1.4, 1.4, 1.4]}>
              <sphereGeometry args={[0.26, 16, 16]} />
              <meshBasicMaterial
                color={item.color}
                transparent
                opacity={isActive ? 0.45 : 0.2}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Floating label */}
            <Html distanceFactor={8} position={[0, -0.45, 0]} center>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectQuality(item.id);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all duration-300 pointer-events-auto backdrop-blur-md whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400/30 text-amber-200 border border-amber-300 shadow-[0_0_15px_rgba(232,199,123,0.5)] scale-110'
                    : 'bg-black/50 text-slate-300 border border-white/10 hover:border-white/40'
                }`}
              >
                {item.name}
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
