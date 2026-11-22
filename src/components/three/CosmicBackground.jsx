import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural Starfield & Cosmic Nebula Dust
 * High performance instanced particle system with gentle drift and twinkling
 */
export default function CosmicBackground({ count = 2200, depth = 120 }) {
  const pointsRef = useRef();
  const dustRef = useRef();

  // Generate star field positions & color variations
  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#E8C77B'), // Warm golden
      new THREE.Color('#9370DB'), // Spiritual violet
      new THREE.Color('#E6DDF5'), // Soft lavender
      new THREE.Color('#FFE4B5'), // Moccasin warm
    ];

    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spread across depth
      const radius = 10 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * depth * 2;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(theta);
      pos[i * 3 + 2] = z;

      // Color pick
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      scl[i] = 0.5 + Math.random() * 1.8;
    }

    return [pos, col, scl];
  }, [count, depth]);

  // Subtle ambient cosmic dust cloud
  const dustPositions = useMemo(() => {
    const pos = new Float32Array(350 * 3);
    for (let i = 0; i < 350; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y -= delta * 0.008;
      dustRef.current.rotation.z += delta * 0.005;
    }
  });

  return (
    <group>
      {/* Primary Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Ambient Cosmic Dust Cloud */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#5B3A91"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
