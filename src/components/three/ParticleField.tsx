"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a sphere
function generateSpherePoints(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random());

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function StarField() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const positions = useMemo(() => generateSpherePoints(5000, 1.5), []);

  // Smooth mouse tracking
  const handlePointerMove = useCallback((e: THREE.Event & { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Continuous slow rotation
    pointsRef.current.rotation.x -= delta * 0.02;
    pointsRef.current.rotation.y -= delta * 0.03;

    // Mouse-driven tilt
    const targetRotX = mouseRef.current.y * 0.15;
    const targetRotZ = mouseRef.current.x * 0.1;
    pointsRef.current.rotation.x += (targetRotX - pointsRef.current.rotation.x) * 0.01;
    pointsRef.current.rotation.z += (targetRotZ - pointsRef.current.rotation.z) * 0.01;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {/* Second layer for depth */}
      <SecondaryStars />
    </group>
  );
}

function SecondaryStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => generateSpherePoints(3000, 2.0), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.x += delta * 0.01;
    pointsRef.current.rotation.y += delta * 0.015;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function ParticleField() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance", stencil: false }}
        dpr={[1, 1.2]}
      >
        <StarField />
      </Canvas>
    </div>
  );
}
