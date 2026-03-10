"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AuroraRibbon({ yOffset, color, speed, amplitude }: {
  yOffset: number;
  color: string;
  speed: number;
  amplitude: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const originalPositions = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 0.8, 80, 4);
    return new Float32Array(geo.attributes.position.array);
  }, []);

  useFrame((state) => {
    if (!geometryRef.current) return;

    const positions = geometryRef.current.attributes.position;
    const time = state.clock.elapsedTime * speed;

    for (let i = 0; i < positions.count; i++) {
      const x = originalPositions[i * 3];
      const y = originalPositions[i * 3 + 1];

      // Flowing wave
      const wave = Math.sin(x * 0.5 + time) * amplitude;
      const wave2 = Math.cos(x * 0.3 + time * 0.7) * amplitude * 0.5;
      const shimmer = Math.sin(x * 2 + time * 2) * 0.05;

      positions.setY(i, y + wave + wave2 + yOffset);
      positions.setZ(i, shimmer + Math.sin(x * 0.8 + time * 0.5) * 0.3);
    }

    positions.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry ref={geometryRef} args={[20, 0.8, 80, 4]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.12}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function AmbientParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.005;

    const positions = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      positions.setY(i, y + Math.sin(state.clock.elapsedTime * 0.5 + i * 0.1) * 0.002);
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#c084fc"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function AuroraWaves() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        {/* Multiple aurora ribbons at different heights/speeds */}
        <AuroraRibbon yOffset={1.5} color="#8b5cf6" speed={0.6} amplitude={0.4} />
        <AuroraRibbon yOffset={0.5} color="#6366f1" speed={0.8} amplitude={0.3} />
        <AuroraRibbon yOffset={-0.3} color="#3b82f6" speed={0.5} amplitude={0.5} />
        <AuroraRibbon yOffset={-1.2} color="#a855f7" speed={0.7} amplitude={0.35} />
        <AuroraRibbon yOffset={-2.0} color="#7c3aed" speed={0.4} amplitude={0.45} />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
