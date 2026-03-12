"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InViewCanvas } from "./InViewCanvas";

function AnimatedGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const gridSize = 40;
  const segments = 25;

  // Store original positions
  const originalPositions = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);
    return new Float32Array(geometry.attributes.position.array);
  }, []);

  useFrame((state) => {
    if (!geometryRef.current) return;

    const positions = geometryRef.current.attributes.position;
    const time = state.clock.elapsedTime;
    const count = positions.count;

    for (let i = 0; i < count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];

      // Simplified wave math for speed
      const z = Math.sin(x * 0.3 + time * 0.8) * 0.5 + 
                Math.cos(y * 0.4 + time * 0.6) * 0.3;

      // Distance fade
      const distSq = x * x + y * y;
      const fade = Math.max(0, 1 - distSq / 800);

      positions.setZ(i, z * fade);
    }

    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, Math.PI / 8]} position={[0, -2, 0]}>
      <planeGeometry ref={geometryRef} args={[gridSize, gridSize, segments, segments]} />
      <meshStandardMaterial
        color="#6366f1"
        wireframe
        transparent
        opacity={0.15}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

function GridGlowPoints() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    const gridSize = 40;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * gridSize * 0.8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * gridSize * 0.5;
    }

    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;

    // Gentle float
    const positions = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      positions.setY(i, y + Math.sin(state.clock.elapsedTime + i) * 0.001);
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -1, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.06}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <AnimatedGrid />
      <GridGlowPoints />
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 5]} intensity={0.3} color="#8b5cf6" />
    </>
  );
}

export default function WaveGrid() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <InViewCanvas>
        <Canvas
          camera={{ position: [0, 8, 15], fov: 55, near: 0.1, far: 100 }}
          style={{ background: "transparent" }}
          gl={{ 
            alpha: true, 
            antialias: false, 
            powerPreference: "high-performance", 
            stencil: false,
            depth: false
          }}
          dpr={1}
        >
          <Scene />
        </Canvas>
      </InViewCanvas>
    </div>
  );
}
