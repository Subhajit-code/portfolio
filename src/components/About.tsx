"use client";

import { motion } from "framer-motion";
import { DynamicParticleField } from "./three";
import Image from "next/image";

export default function About() {
    return (
        <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="about">
            {/* 3D Particle Background */}
            <DynamicParticleField />

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16">
                {/* Left Side: Avatar/Image with cool animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full md:w-5/12"
                >
                    <div
                        className="relative w-72 h-72 md:w-[400px] md:h-[400px] mx-auto group flex items-center justify-center overflow-hidden rounded-3xl"
                        style={{
                            WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
                            maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)"
                        }}
                    >
                        <Image
                            src="/subhajitabout.jpeg"
                            alt="Subhajit Banerjee"
                            fill
                            className="object-cover mix-blend-lighten grayscale opacity-70 group-hover:opacity-100 group-hover:mix-blend-normal group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 288px, 400px"
                        />
                    </div>
                </motion.div>

                {/* Right Side: Text & Info */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full md:w-7/12"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Me</span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        I am a <span className="text-gray-200 font-medium">Results-driven Product Manager</span> and <span className="text-gray-200 font-medium">Full-Stack Web Developer</span> with hands-on experience in end-to-end product lifecycle management, agile execution, and scalable web application development.
                    </p>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                        Proficient in the MERN stack and backend API design, I have a proven ability to translate market research and user needs into well-defined PRDs, deliver cross-functional sprint plans, and ship products on time. I am incredibly passionate about building impactful, data-driven digital products.
                    </p>

                    {/* Achievement Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300">
                            <h4 className="text-blue-400 font-bold text-3xl mb-1">SIH '25</h4>
                            <p className="text-gray-400 text-sm">National Finalist</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300">
                            <h4 className="text-purple-400 font-bold text-3xl mb-1">1st Place</h4>
                            <p className="text-gray-400 text-sm">InCubeS Challenge</p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:translate-y-[-5px] transition-transform duration-300">
                            <h4 className="text-pink-400 font-bold text-3xl mb-1">Winner</h4>
                            <p className="text-gray-400 text-sm">IIC Challenge</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
