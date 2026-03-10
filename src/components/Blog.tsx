"use client";

import { motion } from "framer-motion";

const ARTICLES = [
  {
    title: "My Journey into Product Management and Development",
    excerpt: "How I transitioned into Product Management and Full-Stack Development. The challenges, the late nights, and the breakthroughs.",
    category: "Journey",
    readTime: "5 min read",
    color: "from-blue-500 to-cyan-500",
    link: "#", // Placeholder
  },
  {
    title: "Understanding Monolithic Architecture",
    excerpt: "A deep dive into how I built the BECS backend using Node.js, Express, and SQL for efficient business operations.",
    category: "Tech",
    readTime: "8 min read",
    color: "from-purple-500 to-pink-500",
    link: "#",
  },
  {
    title: "Why I picked MERN stack for Jyotish Urja",
    excerpt: "The benefits of the MERN stack for modern full-stack applications. Why scalable architectures matter for data-driven projects.",
    category: "Tech",
    readTime: "6 min read",
    color: "from-orange-500 to-red-500",
    link: "#",
  },
];

export default function Blog() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="blog">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-16 text-center tracking-tight"
        >
          Insights
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ARTICLES.map((article, index) => (
            <motion.a
              key={index}
              href={article.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative block h-full"
            >
              <div className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-colors flex flex-col">
                {/* Header Gradient */}
                <div className={`h-2 bg-linear-to-r ${article.color}`} />

                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-white`}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Read Article <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
