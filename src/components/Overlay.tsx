"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  // Opacity transforms - Tightened for a 220vh scroll
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.7, 0.85, 0.95, 1.0], [0, 1, 1, 1]);

  // Parallax Y movement
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.65], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0.7, 1.0], [30, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white">
        {/* Section 1 */}
        <motion.div 
            style={{ opacity: opacity1, y: y1, willChange: "opacity, transform" }}
            className="absolute inset-0 flex items-center justify-center p-8 mix-blend-difference"
        >
            <div className="text-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">SUBHAJIT BANERJEE.</h1>
                <p className="text-xl md:text-2xl font-light text-gray-300">Product Manager & Full-Stack Web Developer.</p>
            </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div 
            style={{ opacity: opacity2, y: y2, willChange: "opacity, transform" }}
            className="absolute inset-0 flex items-center justify-start p-8 md:p-24 mix-blend-difference"
        >
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">Building scalable <br/><span className="text-blue-500">web</span> & data-driven products.</h2>
            </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div 
            style={{ opacity: opacity3, y: y3, willChange: "opacity, transform" }}
            className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right mix-blend-difference"
        >
            <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight">Expertise in MERN stack, <br/><span className="text-purple-500">Product Management</span>.</h2>
            </div>
        </motion.div>
    </div>
  );
}
