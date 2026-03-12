"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { DynamicParticleRing } from "./three";

const skills = [
  { 
    category: "Languages & Frameworks", 
    items: [
      { name: "C", icon: "https://skillicons.dev/icons?i=c" },
      { name: "Python", icon: "https://skillicons.dev/icons?i=python" },
      { name: "Java", icon: "https://skillicons.dev/icons?i=java" },
      { name: "JavaScript", icon: "https://skillicons.dev/icons?i=js" },
      { name: "HTML", icon: "https://skillicons.dev/icons?i=html" },
      { name: "CSS", icon: "https://skillicons.dev/icons?i=css" },
      { name: "React.js", icon: "https://skillicons.dev/icons?i=react" },
      { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
      { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
      { name: "Express.js", icon: "https://skillicons.dev/icons?i=express" },
      { name: "Tailwind CSS", icon: "https://skillicons.dev/icons?i=tailwind" }
    ] 
  },
  { 
    category: "Databases & Tools", 
    items: [
      { name: "MongoDB", icon: "https://skillicons.dev/icons?i=mongodb" },
      { name: "MySQL", icon: "https://skillicons.dev/icons?i=mysql" },
      { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
      { name: "Power BI", icon: "https://api.iconify.design/simple-icons:powerbi.svg?color=%23F2C811" },
      { name: "Excel", icon: "https://api.iconify.design/vscode-icons:file-type-excel.svg" },
      { name: "VS Code", icon: "https://skillicons.dev/icons?i=vscode" },
      { name: "Git", icon: "https://skillicons.dev/icons?i=git" },
      { name: "Docker", icon: "https://skillicons.dev/icons?i=docker" },
      { name: "Jupyter", icon: "https://cdn.simpleicons.org/jupyter/F37626" }
    ] 
  },
  { 
    category: "Platforms & Other", 
    items: [
      { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
      { name: "Render", icon: "https://cdn.simpleicons.org/render/white" },
      { name: "AWS", icon: "https://skillicons.dev/icons?i=aws" },
      { name: "Firebase", icon: "https://skillicons.dev/icons?i=firebase" },
      { name: "IntelliJ IDEA", icon: "https://skillicons.dev/icons?i=idea" },
      { name: "PowerPoint", icon: "https://api.iconify.design/vscode-icons:file-type-powerpoint.svg" },
      { name: "Postman", icon: "https://skillicons.dev/icons?i=postman" },
      { name: "n8n", icon: "https://cdn.simpleicons.org/n8n/FF6D5A" },
      { name: "Antigravity", icon: "https://api.iconify.design/material-symbols:rocket-launch-rounded.svg?color=%238b5cf6" }
    ] 
  },
];

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* 3D Particle Ring Background */}
      <DynamicParticleRing />

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            A comprehensive stack enabling end-to-end development of scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-300 mb-6 uppercase tracking-wider">{group.category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                {group.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-center gap-3 p-3 bg-black/40 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-black/60 transition-all group group-hover:scale-[1.02]"
                  >
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
