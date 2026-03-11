"use client";

import { useScroll, useSpring, motion, MotionValue } from "framer-motion";
import { useRef, ReactNode } from "react";
import Image from "next/image";

interface ScrollyImageProps {
  src: string;
  children?: (progress: MotionValue<number>) => ReactNode;
}

export default function ScrollyImage({ src, children }: ScrollyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create a spring for snappy yet smooth progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 300,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[120vh] sm:h-[150vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.div
            className="absolute inset-0 opacity-60"
            style={{ scale: 1.1 }}
        >
            <Image
                src={src}
                alt="Background"
                fill
                priority
                quality={85}
                className="object-cover object-[center_20%]"
                sizes="100vw"
            />
        </motion.div>
        {/* Render children (Overlay) passing the smoothProgress value */}
        {children && children(smoothProgress)}
      </div>
    </div>
  );
}
