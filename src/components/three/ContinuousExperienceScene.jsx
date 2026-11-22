import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ParamdhamCosmicScene from './ParamdhamCosmicScene';
import SoulScene from './SoulScene';
import SupremeSoulScene from './SupremeSoulScene';
import EarthScene from './EarthScene';

/**
 * Tunnel Zoom & Portal Camera Rig:
 * As currentStep transitions smoothly (0.0 -> 1.0 -> 2.0 -> ...):
 * The camera zooms deeper into the center of the previous section,
 * crossing a threshold where the next dimension manifests out of the light point.
 */
export default function ContinuousExperienceScene({ currentStep = 0, mousePos = { x: 0, y: 0 } }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    // Continuous smooth camera positioning based on currentStep (0 to 6)
    // As step increases, we travel forward along Z and slightly tilt with mouse
    const targetZ = 12 - currentStep * 22;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);

    // Dynamic FOV breath when passing through a threshold
    const fraction = currentStep % 1.0;
    const fovBreath = Math.sin(fraction * Math.PI) * 12;
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50 + fovBreath, 0.08);
    state.camera.updateProjectionMatrix();

    // Mouse parallax
    const targetX = mousePos.x * 0.9;
    const targetY = mousePos.y * 0.6;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);

    // Look slightly ahead into the portal
    state.camera.lookAt(0, 0, state.camera.position.z - 15);
  });

  return (
    <group ref={groupRef}>
      {/* Dimension 0: Paramdham Cosmic Atmosphere (Initial Universe) at Z = 0 */}
      <group position={[0, 0, 0]}>
        <ParamdhamCosmicScene mousePos={mousePos} />
      </group>

      {/* Dimension 1 & 2: Transition through Physical Light Portal at Z = -22 */}
      <group position={[0, 0, -22]}>
        <mesh>
          <torusGeometry args={[3.2, 0.06, 16, 100]} />
          <meshBasicMaterial color="#FFA500" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
      </group>

      {/* Dimension 3: Meditating Soul Silhouette & Radiant Forehead Star at Z = -44 */}
      <group position={[0, 0, -44]} scale={[2.2, 2.2, 2.2]}>
        <SoulScene />
      </group>

      {/* Dimension 4: Shiv Baba Supreme Soul (Red-Orange Oval with Coronal Sunburst) at Z = -66 */}
      <group position={[0, 0, -66]} scale={[3.4, 3.4, 3.4]}>
        <SupremeSoulScene interactive={true} />
      </group>

      {/* Dimension 5: Golden Earth & Harmonious Soul Field at Z = -88 */}
      <group position={[0, 0, -88]} scale={[2.8, 2.8, 2.8]}>
        <EarthScene />
      </group>
    </group>
  );
}
