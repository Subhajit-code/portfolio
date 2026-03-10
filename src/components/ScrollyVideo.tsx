"use client";

import { useScroll, useSpring, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollyVideoProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyVideo({ src, children }: ScrollyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a spring for smooth movement
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });

  // Use a high-performance RAF loop to ensure video is ALWAYS in sync with the spring
  useEffect(() => {
    let rafId: number;
    
    const syncVideo = () => {
      if (videoRef.current && videoRef.current.duration && videoRef.current.readyState >= 2) {
        const targetTime = smoothProgress.get() * videoRef.current.duration;
        // Small threshold to prevent unnecessary CPU work
        if (Math.abs(videoRef.current.currentTime - targetTime) > 0.001) {
          videoRef.current.currentTime = targetTime;
        }
      }
      rafId = requestAnimationFrame(syncVideo);
    };

    rafId = requestAnimationFrame(syncVideo);
    return () => cancelAnimationFrame(rafId);
  }, [smoothProgress]);

  // Fail-safe: Show content if video takes too long
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        <video
          ref={videoRef}
          src={src}
          className="h-full w-full object-cover object-top opacity-60"
          style={{ objectPosition: "center 20%", willChange: "transform" }}
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
        />
        {/* Pass the same smoothProgress to the overlay */}
        {isReady && children && children(smoothProgress)}
      </motion.div>
    </div>
  );
}
