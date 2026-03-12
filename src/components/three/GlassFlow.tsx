"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InViewCanvas } from "./InViewCanvas";

function GlassPlate({ position, rotation, scale, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y += Math.sin(time + position[0]) * 0.002;
    meshRef.current.rotation.x += Math.cos(time * 0.5 + position[1]) * 0.001;
    meshRef.current.rotation.y += Math.sin(time * 0.5 + position[2]) * 0.001;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 0.05]} />
      <meshStandardMaterial
        color={color}
        metalness={0.2}
        roughness={0.05}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Scene() {
  const plates = useMemo(() => {
    const data = [];
    const colors = ["#3b82f6", "#8b5cf6", "#6366f1", "#4f46e5", "#c084fc"];
    for (let i = 0; i < 10; i++) { // Reduced from 15 for performance
        data.push({
            position: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 5 - 2
            ] as [number, number, number],
            rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ] as [number, number, number],
            scale: [
                Math.random() * 2 + 1,
                Math.random() * 1.5 + 0.5,
                1
            ] as [number, number, number],
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    return data;
  }, []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={1} color="#ffffff" />
      {plates.map((plate, i) => (
        <GlassPlate key={i} {...plate} />
      ))}
    </>
  );
}

export default function GlassFlow() {
  return (
    <div className="absolute inset-0 z-0 opacity-80" style={{ pointerEvents: "none" }}>
      <InViewCanvas>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
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
