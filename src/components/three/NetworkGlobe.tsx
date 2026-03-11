"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Globe() {
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Create wireframe sphere edges
  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 3);
    return new THREE.EdgesGeometry(geo);
  }, []);

  useFrame((state) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      wireframeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Wireframe globe */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.95, 32, 32]} />
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Core light */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

function ConnectionPoints() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate points on the globe surface
  const points = useMemo(() => {
    const pts: { position: THREE.Vector3; connections: number[] }[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.02;

      const pos = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // Connect to 2-3 nearest points
      const connections: number[] = [];
      for (let j = 0; j < Math.min(i, 3); j++) {
        const connectTo = Math.floor(Math.random() * i);
        if (!connections.includes(connectTo)) {
          connections.push(connectTo);
        }
      }
      pts.push({ position: pos, connections });
    }
    return pts;
  }, []);

  // Create connection lines
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    points.forEach((point, i) => {
      point.connections.forEach((connectTo) => {
        // Create arc between points
        const start = point.position;
        const end = points[connectTo].position;
        const mid = new THREE.Vector3()
          .addVectors(start, end)
          .multiplyScalar(0.5)
          .normalize()
          .multiplyScalar(2.5); // Arc height

        // Add 10 segments for the arc
        for (let t = 0; t < 10; t++) {
          const t1 = t / 10;
          const t2 = (t + 1) / 10;

          // Quadratic bezier
          const p1 = new THREE.Vector3()
            .copy(start).multiplyScalar((1 - t1) * (1 - t1))
            .add(new THREE.Vector3().copy(mid).multiplyScalar(2 * (1 - t1) * t1))
            .add(new THREE.Vector3().copy(end).multiplyScalar(t1 * t1));

          const p2 = new THREE.Vector3()
            .copy(start).multiplyScalar((1 - t2) * (1 - t2))
            .add(new THREE.Vector3().copy(mid).multiplyScalar(2 * (1 - t2) * t2))
            .add(new THREE.Vector3().copy(end).multiplyScalar(t2 * t2));

          positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
        }
      });
    });
    return new Float32Array(positions);
  }, [points]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connection arcs */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.3}
        />
      </lineSegments>

      {/* Node points */}
      {points.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial
            color="#22d3ee"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Pulsing halos around nodes */}
      {points.slice(0, 8).map((point, i) => (
        <mesh key={`halo-${i}`} position={point.position}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitDots() {
  const dotsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 2;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (dotsRef.current) {
      dotsRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={dotsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.015}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

import { InViewCanvas } from "./InViewCanvas";

export default function NetworkGlobe() {
  return (
    <div className="absolute inset-0 z-0 opacity-80" style={{ pointerEvents: "none" }}>
      <InViewCanvas>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          style={{ background: "transparent" }}
          gl={{ 
            alpha: true, 
            antialias: false, 
            powerPreference: "high-performance", 
            stencil: false,
            depth: false
          }}
          dpr={[1, 1.5]}
        >
          <Globe />
          <ConnectionPoints />
          <OrbitDots />
        </Canvas>
      </InViewCanvas>
    </div>
  );
}
