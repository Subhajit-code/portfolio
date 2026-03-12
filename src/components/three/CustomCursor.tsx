"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function MinimalCursor({ isVisible }: { isVisible: boolean }) {
  const { viewport } = useThree();
  const ringRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      const targetElement = e.target as HTMLElement;
      const hoverable = 
        targetElement.tagName === "A" || 
        targetElement.tagName === "BUTTON" || 
        targetElement.closest("button") || 
        targetElement.closest("a") ||
        window.getComputedStyle(targetElement).cursor === "pointer";
      
      setIsHovering(!!hoverable);
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ringRef.current || !dotRef.current) return;

    // Smoothing
    const lerpFactor = 0.15;
    mouse.current.x += (target.current.x - mouse.current.x) * lerpFactor;
    mouse.current.y += (target.current.y - mouse.current.y) * lerpFactor;

    const x = (mouse.current.x * viewport.width) / 2;
    const y = (mouse.current.y * viewport.height) / 2;

    // Dot is precise (fast follow)
    dotRef.current.position.x += (x - dotRef.current.position.x) * 0.4;
    dotRef.current.position.y += (y - dotRef.current.position.y) * 0.4;

    // Ring is floating (slow follow)
    ringRef.current.position.x += (x - ringRef.current.position.x) * 0.12;
    ringRef.current.position.y += (y - ringRef.current.position.y) * 0.12;

    // Scaling & Opacity
    const targetScale = isHovering ? 2.2 : 1.0;
    const pressScale = isPressed ? 0.7 : 1.0;
    const finalScale = targetScale * pressScale;
    
    ringRef.current.scale.lerp(new THREE.Vector3(finalScale, finalScale, 1), 0.1);
    dotRef.current.scale.lerp(new THREE.Vector3(isHovering ? 0.5 : 1, isHovering ? 0.5 : 1, 1), 0.1);

    const opacityTarget = isVisible ? 1 : 0;
    // @ts-ignore
    ringRef.current.material.opacity = THREE.MathUtils.lerp(ringRef.current.material.opacity, opacityTarget * 0.4, 0.1);
    // @ts-ignore
    dotRef.current.material.opacity = THREE.MathUtils.lerp(dotRef.current.material.opacity, opacityTarget * 1.0, 0.1);

    // Subtle rotation for interest
    ringRef.current.rotation.z += delta * 0.5;
  });

  return (
    <group>
      {/* 1. Precise Center Dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.015, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} depthTest={false} />
      </mesh>

      {/* 2. Minimal Floating Ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.08, 0.09, 64]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0} 
          depthTest={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. Subtle Inner Glow (Visible on click) */}
      {isPressed && (
        <mesh position={[
          (mouse.current.x * viewport.width) / 2,
          (mouse.current.y * viewport.height) / 2,
          0
        ]}>
          <ringGeometry args={[0, 0.15, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      )}
    </group>
  );
}

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        document.body.classList.remove("hide-cursor");
      } else {
        document.body.classList.add("hide-cursor");
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      document.body.classList.remove("hide-cursor");
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: 100000, 
        mixBlendMode: "difference"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ pointerEvents: "none" }}
        gl={{ 
          alpha: true, 
          antialias: false,
          powerPreference: "high-performance",
          depth: false
        }}
        dpr={1}
      >
        <MinimalCursor isVisible={isVisible} />
      </Canvas>
    </div>
  );
}
