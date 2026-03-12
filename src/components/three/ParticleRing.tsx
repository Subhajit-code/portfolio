"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowingRing() {
  const ringRef = useRef<THREE.Points>(null);
  const innerRingRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.0;
      // Add some noise/variation to ring
      const noiseR = (Math.random() - 0.5) * 0.15;
      const noiseY = (Math.random() - 0.5) * 0.1;

      pos[i * 3] = (radius + noiseR) * Math.cos(angle);
      pos[i * 3 + 1] = noiseY;
      pos[i * 3 + 2] = (radius + noiseR) * Math.sin(angle);

      sz[i] = Math.random() * 0.02 + 0.005;
    }

    return { positions: pos, sizes: sz };
  }, []);

  const innerPositions = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 1.3;
      const noiseR = (Math.random() - 0.5) * 0.1;
      const noiseY = (Math.random() - 0.5) * 0.08;

      pos[i * 3] = (radius + noiseR) * Math.cos(angle);
      pos[i * 3 + 1] = noiseY;
      pos[i * 3 + 2] = (radius + noiseR) * Math.sin(angle);
    }

    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.2;
      innerRingRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group rotation={[Math.PI / 5, 0, Math.PI / 8]}>
      {/* Outer ring */}
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#8b5cf6"
          size={0.025}
          transparent
          opacity={1.0}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner ring */}
      <points ref={innerRingRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#3b82f6"
          size={0.02}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

function AmbientDust() {
  const dustRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!dustRef.current) return;
    dustRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={dustRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#a855f7"
        size={0.012}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

import { InViewCanvas } from "./InViewCanvas";

export default function ParticleRing() {
  return (
    <div className="absolute inset-0 z-0" style={{ pointerEvents: "none" }}>
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
          dpr={[1, 1.2]}
        >
          <GlowingRing />
          <AmbientDust />
        </Canvas>
      </InViewCanvas>
    </div>
  );
}
