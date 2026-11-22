import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Custom 3D Supreme Soul (Shiv Baba) Representation
 * Faithfully matches the uploaded visual identity:
 * - Vertically oriented oval egg-like shape (Jyotirlingam / Shiva lingam of pure light)
 * - Radiant deep ruby-red core
 * - Fiery orange-red outer rim glow
 * - Sunburst rays extending outward in a 360-degree corona
 * - Brilliant white incandescent central spark
 * - Subtle floating golden sparkles and cosmic rays
 */
export default function SupremeSoulScene({ interactive = true }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const innerSunburstRef = useRef();
  const outerRaysRef = useRef();
  const auraHaloRef = useRef();
  const sparklesRef = useRef();

  // Procedural Sunburst Rays (24-32 geometric petals radiating from center like reference image)
  const rayGeometry = useMemo(() => {
    const rayCount = 28;
    const positions = [];
    const colors = [];

    const innerColor = new THREE.Color('#FFF5D0');
    const midColor = new THREE.Color('#FF8C00');
    const outerColor = new THREE.Color('#D21404');

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const nextAngle = ((i + 0.5) / rayCount) * Math.PI * 2;

      // Vertical oval distortion (egg-like proportions: height scale ~1.35)
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosB = Math.cos(nextAngle);
      const sinB = Math.sin(nextAngle);

      const rInner = 0.28;
      const rOuter = 0.95;

      // Triangle 1
      positions.push(
        cosA * rInner, sinA * rInner * 1.35, 0.05,
        cosA * rOuter, sinA * rOuter * 1.35, 0.0,
        cosB * rOuter, sinB * rOuter * 1.35, 0.0
      );

      // Interpolate colors
      colors.push(
        innerColor.r, innerColor.g, innerColor.b,
        midColor.r, midColor.g, midColor.b,
        outerColor.r, outerColor.g, outerColor.b
      );
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  // Floating Divine Sparkles / Golden Motes around Shiv Baba
  const [sparklePositions] = useMemo(() => {
    const count = 240;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 0.8 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      // Oval vertical elongation
      pos[i * 3 + 1] = radius * Math.sin(phi) * 1.3;
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return [pos];
  }, []);

  // Custom Shader Material for the luminous Red-Orange Oval Body
  const ovalShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uCoreColor: { value: new THREE.Color('#FF2200') },
        uEdgeColor: { value: new THREE.Color('#FFA500') },
        uWhiteCenter: { value: new THREE.Color('#FFFFFF') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uCoreColor;
        uniform vec3 uEdgeColor;
        uniform vec3 uWhiteCenter;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Distance from center on 2D oval plane
          vec2 center = vec2(0.5, 0.5);
          vec2 uvOffset = vUv - center;
          // Vertical egg compression for UV
          uvOffset.y *= 0.8;
          float dist = length(uvOffset) * 2.0;

          // Pulsing radiance
          float pulse = 0.05 * sin(uTime * 3.0);
          dist += pulse;

          // Color gradient from center white to deep ruby red to glowing orange rim
          vec3 finalColor = uCoreColor;
          if (dist < 0.25) {
            float t = smoothstep(0.0, 0.25, dist);
            finalColor = mix(uWhiteCenter, vec3(1.0, 0.25, 0.05), t);
          } else if (dist < 0.85) {
            float t = smoothstep(0.25, 0.85, dist);
            finalColor = mix(vec3(1.0, 0.1, 0.0), uEdgeColor, t);
          } else {
            float t = smoothstep(0.85, 1.1, dist);
            finalColor = mix(uEdgeColor, vec3(0.9, 0.05, 0.0), t);
          }

          // Fresnel glow edge
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          finalColor += uEdgeColor * fresnel * 0.7;

          float alpha = smoothstep(1.2, 0.7, dist);
          gl_FragColor = vec4(finalColor, alpha * 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (ovalShaderMaterial) {
      ovalShaderMaterial.uniforms.uTime.value = time;
    }

    if (groupRef.current) {
      // Very gentle sacred breathing oscillation
      groupRef.current.position.y = Math.sin(time * 0.9) * 0.07;
      if (interactive) {
        // Subtle response to cursor
        const mouseX = (state.mouse.x * 0.15);
        const mouseY = (state.mouse.y * 0.15);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY, 0.05);
      }
    }

    if (coreRef.current) {
      // Brilliant central white spark pulse
      const spark = 1.0 + Math.sin(time * 4.5) * 0.18;
      coreRef.current.scale.set(spark, spark, spark);
    }

    if (innerSunburstRef.current) {
      innerSunburstRef.current.rotation.z += delta * 0.08;
    }

    if (outerRaysRef.current) {
      outerRaysRef.current.rotation.z -= delta * 0.04;
      const s = 1.0 + Math.sin(time * 2.2) * 0.08;
      outerRaysRef.current.scale.set(s, s, s);
    }

    if (auraHaloRef.current) {
      const haloScale = 1.35 + Math.sin(time * 1.8) * 0.09;
      auraHaloRef.current.scale.set(haloScale, haloScale * 1.35, haloScale);
    }

    if (sparklesRef.current) {
      sparklesRef.current.rotation.y += delta * 0.05;
      sparklesRef.current.rotation.z = Math.sin(time * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Outermost Divine Golden-Amber Volumetric Aura */}
      <mesh ref={auraHaloRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Secondary Radiant Red-Orange Halo */}
      <mesh scale={[1.2, 1.55, 0.9]}>
        <sphereGeometry args={[0.92, 32, 32]} />
        <meshBasicMaterial
          color="#FF3300"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Concentric Sunburst Rays Layer (Brahma Kumaris signature Shiv Baba rays) */}
      <mesh ref={innerSunburstRef} geometry={rayGeometry}>
        <meshBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Outer Soft Ray Corona */}
      <group ref={outerRaysRef} scale={[1.4, 1.4, 1]}>
        <mesh geometry={rayGeometry}>
          <meshBasicMaterial
            vertexColors
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 5. The Sacred Oval Jyotir-Bindu (Vertical Oval of Radiant Crimson Light) */}
      <mesh scale={[0.88, 1.25, 0.45]}>
        <sphereGeometry args={[0.7, 48, 48]} />
        <primitive object={ovalShaderMaterial} attach="material" />
      </mesh>

      {/* 6. Pure White Incandescent Central Soul Spark (The eternal Source) */}
      <mesh ref={coreRef} position={[0, 0, 0.25]}>
        <sphereGeometry args={[0.11, 32, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* 7. Central Radiant Star Cross-Flare */}
      <group position={[0, 0, 0.27]}>
        <mesh rotation={[0, 0, 0]} scale={[0.025, 0.45, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]} scale={[0.025, 0.45, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]} scale={[0.015, 0.3, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#FFE4B5" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]} scale={[0.015, 0.3, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#FFE4B5" transparent opacity={0.7} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* 8. Swarm of Golden Motes / Cosmic Sparkles in Paramdham */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={sparklePositions.length / 3}
            array={sparklePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#FFD700"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 9. Golden Light Source */}
      <pointLight color="#FFA500" intensity={3.5} distance={15} decay={2} />
      <pointLight color="#FFFFFF" intensity={2.0} distance={5} decay={2} position={[0, 0, 0.5]} />
    </group>
  );
}
