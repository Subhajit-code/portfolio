"use client";

import { useTransform, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const roles = [
    "Product Manager",
    "Full-Stack Web Developer",
    "Building Scalable Products",
    "MERN Stack & Data Strategist"
];

function Typewriter({ words }: { words: string[] }) {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(100);

    const tick = useCallback(() => {
        const i = index % words.length;
        const fullText = words[i];
        
        if (!isDeleting) {
            // Typing
            const nextText = fullText.substring(0, displayText.length + 1);
            setDisplayText(nextText);
            setSpeed(100);
            
            if (nextText === fullText) {
                setIsDeleting(true);
                setSpeed(2000); // Pause at end of word
            }
        } else {
            // Deleting
            const nextText = fullText.substring(0, displayText.length - 1);
            setDisplayText(nextText);
            setSpeed(50);
            
            if (nextText === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
                setSpeed(500); // Pause before next word starts
            }
        }
    }, [displayText, isDeleting, index, words]);

    useEffect(() => {
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, speed]);

    return (
        <div className="text-xl sm:text-2xl md:text-4xl font-light tracking-wide min-h-[1.5em] flex items-center justify-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {displayText}
            </span>
            <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-0.5 h-6 md:h-10 ml-1 bg-blue-400" 
            />
        </div>
    );
}

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
  // Background opacity and Y movement remain smooth
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <motion.div 
      style={{ opacity: backgroundOpacity, y: textY }}
      className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center px-4 md:px-8 text-white"
    >
        <div className="text-center w-full max-w-4xl pt-20 md:pt-0">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-4"
            >
                SUBHAJIT BANERJEE.
            </motion.h1>
            
            <Typewriter words={roles} />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto"
            >
                Specializing in building high-performance web applications and data-driven product management strategies.
            </motion.p>
        </div>
    </motion.div>
  );
}
