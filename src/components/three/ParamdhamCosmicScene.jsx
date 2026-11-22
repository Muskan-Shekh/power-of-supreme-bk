import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Paramdham Background (Inspired by the 3rd reference image):
 * - Deep luminous amber-crimson gradient atmosphere
 * - Infinite field of glowing golden & amber particles drifting and twinkling
 * - Volumetric central light aura with expanding divine rings
 */
export default function ParamdhamCosmicScene({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  const pointsRef = useRef();
  const dustRef = useRef();
  const auraGlowRef = useRef();
  const ringsRef = useRef();

  // Create dense field of golden/amber cosmic specks (like reference 3)
  const [positions, colors, scales, speeds] = useMemo(() => {
    const count = 3200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const spd = new Float32Array(count);

    const palette = [
      new THREE.Color('#FFD700'), // Bright Gold
      new THREE.Color('#FFA500'), // Radiant Amber
      new THREE.Color('#FF4500'), // Fiery Orange-Red
      new THREE.Color('#FFF5D0'), // Incandescent Warm White
      new THREE.Color('#FF8C00'), // Dark Orange
    ];

    for (let i = 0; i < count; i++) {
      // Cylinder / tunnel distribution along Z for cinematic fly-through
      const radius = 0.5 + Math.pow(Math.random(), 0.6) * 35;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 80;

      pos[i * 3] = radius * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(theta);
      pos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      scl[i] = 0.4 + Math.random() * 2.2;
      spd[i] = 0.2 + Math.random() * 0.8;
    }

    return [pos, col, scl, spd];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (pointsRef.current) {
      // Gentle swirling vortex & twinkle
      pointsRef.current.rotation.z += delta * 0.02;
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        mousePos.x * 0.15,
        0.05
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -mousePos.y * 0.15,
        0.05
      );
    }

    if (auraGlowRef.current) {
      // Organic breathing pulse of the cosmic red-golden source
      const pulse = 1.0 + Math.sin(time * 1.8) * 0.12;
      auraGlowRef.current.scale.set(pulse, pulse * 1.25, pulse);
    }

    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.05;
      const s = 1.0 + (time * 0.2) % 1.5;
      ringsRef.current.scale.set(s, s * 1.2, s);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Deep Crimson-Amber Space Backdrop Sphere */}
      <mesh scale={[-50, -50, -50]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#3A0503"
          side={THREE.BackSide}
        />
      </mesh>

      {/* 2. Central Paramdham Glowing Sun Core (Visible in reference image 3) */}
      <group position={[0, 0, -12]}>
        {/* Core incandescent aura */}
        <mesh ref={auraGlowRef}>
          <sphereGeometry args={[5.5, 32, 32]} />
          <meshBasicMaterial
            color="#FF4500"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Inner radiant halo */}
        <mesh scale={[3.8, 4.8, 3.8]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#FFA500"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Central white-hot nucleus */}
        <mesh scale={[1.8, 2.3, 1.8]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#FFF4D0"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Expanding subtle light ripples */}
        <group ref={ringsRef}>
          <mesh>
            <ringGeometry args={[3.2, 3.35, 64]} />
            <meshBasicMaterial
              color="#FFA500"
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[5.2, 5.35, 64]} />
            <meshBasicMaterial
              color="#FF4500"
              transparent
              opacity={0.25}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>

      {/* 3. Golden Motes & Cosmic Specks Swarm */}
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
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Ambient lighting */}
      <ambientLight intensity={0.6} color="#FFA500" />
      <pointLight position={[0, 0, -10]} intensity={4.0} color="#FFD700" distance={50} decay={2} />
    </group>
  );
}
