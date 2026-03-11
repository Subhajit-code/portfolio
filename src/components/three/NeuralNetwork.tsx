"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function DataStream({ offset, color, radius, speed }: {
  offset: number;
  color: string;
  radius: number;
  speed: number;
}) {
  const lineRef = useRef<THREE.Line>(null);

  const { positions, opacities } = useMemo(() => {
    const count = 100;
    const pos = new Float32Array(count * 3);
    const opac = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4 + offset;

      pos[i * 3] = Math.cos(angle) * radius * (1 + t * 0.3);
      pos[i * 3 + 1] = (t - 0.5) * 8;
      pos[i * 3 + 2] = Math.sin(angle) * radius * (1 + t * 0.3);

      opac[i] = Math.sin(t * Math.PI) * 0.8;
    }
    return { positions: pos, opacities: opac };
  }, [offset, radius]);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.elapsedTime * speed;
  });

  return (
    <line ref={lineRef as any}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.25}
      />
    </line>
  );
}

function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const count = 60;
    const data: { pos: [number, number, number]; size: number }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        pos: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8
        ],
        size: Math.random() * 0.04 + 0.02
      });
    }
    return data;
  }, []);

  // Lines between nearby nodes
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    const maxDist = 3.5;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].pos[0] - nodes[j].pos[0];
        const dy = nodes[i].pos[1] - nodes[j].pos[1];
        const dz = nodes[i].pos[2] - nodes[j].pos[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDist) {
          positions.push(
            ...nodes[i].pos,
            ...nodes[j].pos
          );
        }
      }
    }
    return new Float32Array(positions);
  }, [nodes]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.015;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
        />
      </lineSegments>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[node.size, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#3b82f6" : "#a855f7"}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

import { InViewCanvas } from "./InViewCanvas";

export default function NeuralNetwork() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <InViewCanvas>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ 
            alpha: true, 
            antialias: false, 
            powerPreference: "high-performance", 
            stencil: false 
          }}
          dpr={[1, 1.5]}
        >
          <DataStream offset={0} color="#8b5cf6" radius={2} speed={0.1} />
          <DataStream offset={Math.PI / 2} color="#3b82f6" radius={2.5} speed={-0.08} />
          <DataStream offset={Math.PI} color="#a855f7" radius={1.8} speed={0.12} />
          <FloatingNodes />
        </Canvas>
      </InViewCanvas>
    </div>
  );
}
