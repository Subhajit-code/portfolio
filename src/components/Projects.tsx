"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DynamicNeuralNetwork } from "./three";

// Project Data with Media & Layout Configuration
const projects = [
    {
        id: "becs",
        title: "BECS",
        category: "Web Application",
        description: "End-to-end web-based system owning product planning and full-stack development.",
        longDescription: "Designed and developed BECS as an end-to-end web-based system, owning both product planning and full-stack development. Built responsive user interfaces using HTML, CSS, and JavaScript, ensuring usability and cross-browser compatibility. Developed backend services and APIs with Node.js and Express.js, enabling secure data handling and system operations. Implemented SQL-based database design and management for efficient data storage, retrieval, and reporting.",
        techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"],
        repo: "#",
        demo: "https://banerjeeelectronicsconsultancyservices.com/",
        color: "from-blue-600/20 to-cyan-500/20",
        hoverColor: "group-hover:from-blue-600/40 group-hover:to-cyan-500/40",
        span: "md:col-span-2 md:row-span-2",
        mediaType: "image",
        mediaUrl: "/project/ecom.png",
        demoUrl: "/project/ecom.png"
    },
    {
        id: "jyotish-urja",
        title: "JYOTISH URJA",
        category: "MERN Stack",
        description: "Full-stack web application designed and developed using the MERN stack.",
        longDescription: "Designed and developed a full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js). Built responsive and dynamic front-end interfaces with React.js, improving user experience and performance. Developed RESTful APIs and backend services using Node.js and Express.js to handle business logic and data flow. Implemented MongoDB database schemas and CRUD operations, ensuring scalable and efficient data management. Integrated authentication, authorization, and secure API handling for reliable application access.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js"],
        repo: "#",
        demo: "https://jyotishurja.com/",
        color: "from-purple-600/20 to-pink-500/20",
        hoverColor: "group-hover:from-purple-600/40 group-hover:to-pink-500/40",
        span: "md:col-span-1 md:row-span-2",
        mediaType: "image",
        mediaUrl: "/project/jotis.png",
        demoUrl: "/project/jotis.png"
    },
    {
        id: "jm-biotech",
        title: "JM BIOTECH",
        category: "Company Website",
        description: "Responsive company website with user-friendly UI layouts and interactive components.",
        longDescription: "Designed and developed a responsive company website for JM Biotech using HTML, CSS, and JavaScript. Created user-friendly UI layouts and interactive components, improving accessibility and overall user experience. Implemented client-side functionality and form validations using JavaScript to enhance usability. Optimized website performance and ensured cross-browser compatibility and responsive design standards.",
        techStack: ["HTML", "CSS", "JavaScript"],
        repo: "#",
        demo: "https://www.jmbiotech.in/",
        color: "from-green-600/20 to-teal-500/20",
        hoverColor: "group-hover:from-green-600/40 group-hover:to-teal-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/project/jm.png",
        demoUrl: "/project/jm.png"
    },
    {
        id: "khaww",
        title: "KHAWW",
        category: "Mobile Application",
        description: "End-to-end business planning and backend development for a scalable product.",
        longDescription: "Led end-to-end business planning for KHAWW, including market analysis, pricing strategy, revenue model, and go-to-market planning. Contributed to backend development, building and supporting server-side logic, APIs, and data handling to ensure reliable system functionality. Translated business requirements into technical specifications and workflows, aligning product strategy with development execution. Collaborated with cross-functional teams to support feature delivery, scalability, and operational readiness.",
        techStack: ["Business Planning", "Backend Dev", "APIs"],
        repo: "#",
        demo: "https://play.google.com/store/apps/details?id=com.techaconsolutions.khaww",
        color: "from-orange-500/20 to-red-500/20",
        hoverColor: "group-hover:from-orange-500/40 group-hover:to-red-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/project/khaw.png",
        demoUrl: "/project/khaw.png"
    },
    {
        id: "muscle-mania",
        title: "MUSCLE MANIA",
        category: "Web Application",
        description: "Full-stack project emphasizing backend logic and cross-functional team execution.",
        longDescription: "Led end-to-end business planning for MUSCLE MANIA, including market analysis, pricing strategy, revenue model, and go-to-market planning. Contributed to backend development, building and supporting server-side logic, APIs, and data handling to ensure reliable system functionality. Translated business requirements into technical specifications and workflows, aligning product strategy with development execution. Collaborated with cross-functional teams to support feature delivery, scalability, and operational readiness.",
        techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"],
        repo: "#",
        demo: "https://musclemanias.in/",
        color: "from-yellow-600/20 to-orange-500/20",
        hoverColor: "group-hover:from-yellow-600/40 group-hover:to-orange-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/project/musclemania.png",
        demoUrl: "/project/musclemania.png"
    },
    {
        id: "indiiserve",
        title: "Indiserve",
        category: "Web Application",
        description: "Innovative platform designed with full-stack execution and responsive UI components.",
        longDescription: "Led end-to-end business planning for Indiserve, including market analysis, pricing strategy, revenue model, and go-to-market planning. Contributed to backend development, building and supporting server-side logic, APIs, and data handling to ensure reliable system functionality. Translated business requirements into technical specifications and workflows, aligning product strategy with development execution. Collaborated with cross-functional teams to support feature delivery, scalability, and operational readiness.",
        techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQL"],
        repo: "#",
        demo: "https://indiiserve.com/",
        color: "from-cyan-600/20 to-blue-500/20",
        hoverColor: "group-hover:from-cyan-600/40 group-hover:to-blue-500/40",
        span: "md:col-span-1 md:row-span-1",
        mediaType: "image",
        mediaUrl: "/project/indiiserve.png",
        demoUrl: "/project/indiiserve.png"
    }
];

const INITIAL_VISIBLE_COUNT = 5;

export default function Projects() {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

    const selectedProject = projects.find((p) => p.id === selectedId);
    const visibleProjects = projects.slice(0, visibleCount);
    const hasMore = visibleCount < projects.length;

    return (
        <section className={`relative bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden ${selectedId ? 'z-[999]' : 'z-20'}`} id="projects">
            {/* 3D Neural Network Background */}
            <DynamicNeuralNetwork />
            
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        A curated selection of projects demonstrating full-stack capabilities,
                        microservices architecture, and modern interface design.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layoutId={project.id}
                                onClick={() => setSelectedId(project.id)}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                viewport={{ once: true }}
                                className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-[#0f0f0f] shadow-2xl ${project.span} hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-white/20 transition-all duration-500`}
                                whileHover={{ scale: 1.02, y: -5 }}
                            >
                                {/* Media Background */}
                                <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#111]">
                                    <img
                                        src={project.mediaUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                                    />
                                    {/* Gradient Overlays */}
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-70" />
                                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`} />
                                </div>

                                {/* Content */}
                                <div className="relative z-20 p-8 flex flex-col justify-end h-full min-h-[300px]">
                                    <div className="absolute top-6 left-6 flex justify-between w-[calc(100%-3rem)] items-start">
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.slice(0, 3).map(t => (
                                                <span key={t} className="text-[10px] uppercase font-bold tracking-wider text-white bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 shadow-sm translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0 shadow-lg text-white">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <span className="text-blue-400 font-mono text-xs mb-3 block opacity-80 group-hover:opacity-100 transition-opacity duration-500">{project.category}</span>
                                        <h3 className="text-3xl font-extrabold text-white mb-2 leading-tight tracking-wide drop-shadow-lg">{project.title}</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-0 group-hover:h-auto overflow-hidden">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Pagination Buttons */}
                <motion.div layout className="flex justify-center mt-12">
                    {hasMore ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                        >
                            View More Projects
                            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>
                    ) : projects.length > INITIAL_VISIBLE_COUNT && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const projectsSection = document.getElementById('projects');
                                if (projectsSection) {
                                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                                }
                                setVisibleCount(INITIAL_VISIBLE_COUNT);
                            }}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                        >
                            Show Less
                            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </motion.button>
                    )}
                </motion.div>

                {/* Enhanced Modal */}
                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/70 backdrop-blur-xl z-[100]"
                            />
                            <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-auto p-4 md:p-8">
                                <motion.div
                                    layoutId={selectedId}
                                    className="bg-[#0f0f0f] w-full max-w-5xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative scrollbar-hide flex flex-col md:flex-row"
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-all duration-300 border border-white/10 hover:border-white/30 backdrop-blur-md group"
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    { /* Visual Side */}
                                    <div className={`w-full md:w-1/2 min-h-[250px] md:min-h-full relative overflow-hidden flex flex-col justify-end p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5`}>
                                        <div className="absolute inset-0 bg-black z-0">
                                            <img
                                                src={selectedProject.demoUrl || selectedProject.mediaUrl}
                                                alt={selectedProject.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-90 md:opacity-100"
                                            />
                                        </div>
                                        <div className={`absolute inset-0 bg-linear-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent z-10 md:hidden`} />
                                        <div className={`absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#0f0f0f] z-10 hidden md:block`} />
                                        <div className={`absolute inset-0 bg-linear-to-b ${selectedProject.color} opacity-10 z-10`} />

                                        <div className="relative z-20 mt-auto drop-shadow-2xl">
                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="inline-block px-3 py-1.5 rounded-full bg-blue-500/20 text-xs font-mono font-bold text-blue-300 mb-4 border border-blue-500/30 backdrop-blur-md"
                                            >
                                                {selectedProject.category}
                                            </motion.span>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md mb-2"
                                            >
                                                {selectedProject.title}
                                            </motion.h3>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2 p-8 md:p-12 bg-[#0f0f0f] flex flex-col z-20 relative">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex-1 flex flex-col"
                                        >
                                            <h4 className="text-sm font-bold text-gray-500 flex items-center gap-2 mb-4">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                ABOUT THE PROJECT
                                            </h4>
                                            <p className="text-gray-300 leading-relaxed mb-10 text-base md:text-lg opacity-90">
                                                {selectedProject.longDescription}
                                            </p>

                                            <div className="mb-10">
                                                <h4 className="text-sm font-bold text-gray-500 flex items-center gap-2 mb-4">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                                    CORE TECHNOLOGIES
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.techStack.map((tech, i) => (
                                                        <motion.span
                                                            key={tech}
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            transition={{ delay: 0.5 + (i * 0.05) }}
                                                            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-gray-200 border border-white/5 transition-all hover:scale-105 cursor-default hover:border-white/20 hover:text-white"
                                                        >
                                                            {tech}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5 mt-auto">
                                                {selectedProject.repo !== "#" && (
                                                    <a
                                                        href={selectedProject.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-4 rounded-xl bg-white/10 text-white font-bold text-center hover:bg-white/20 transition-all border border-white/10 flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                        View Source
                                                    </a>
                                                )}
                                                {selectedProject.demo !== "#" && (
                                                    <a
                                                        href={selectedProject.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold text-center hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
                                                    >
                                                        Visit Live Demo
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
