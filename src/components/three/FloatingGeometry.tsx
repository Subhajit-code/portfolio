"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          roughness={0.1}
          metalness={0.9}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function OrbitingRing({ radius, speed, tilt, color, thickness }: {
  radius: number;
  speed: number;
  tilt: number;
  color: string;
  thickness: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ringRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, thickness, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
        wireframe
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Scatter particles in a sphere around the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // Random purple-blue gradient colors
      const t = Math.random();
      col[i * 3] = 0.4 + t * 0.2;     // R
      col[i * 3 + 1] = 0.2 + t * 0.2; // G
      col[i * 3 + 2] = 0.8 + t * 0.2; // B
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle breathing motion
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <GlassSphere />
      <OrbitingRing radius={1.8} speed={0.3} tilt={Math.PI / 4} color="#8b5cf6" thickness={0.015} />
      <OrbitingRing radius={2.2} speed={-0.2} tilt={Math.PI / 3} color="#3b82f6" thickness={0.01} />
      <OrbitingRing radius={2.6} speed={0.15} tilt={-Math.PI / 6} color="#a855f7" thickness={0.008} />
      <FloatingParticles />

      {/* Ambient + directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#8b5cf6" />
      <directionalLight position={[-5, -3, 2]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[0, 0, 3]} intensity={1} color="#a855f7" distance={8} />
    </group>
  );
}

import { InViewCanvas } from "./InViewCanvas";

export default function FloatingGeometry() {
  return (
    <div className="w-full h-full min-h-[400px]" style={{ pointerEvents: "auto" }}>
      <InViewCanvas>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
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
