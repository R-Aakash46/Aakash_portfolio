import React from "react";
import { PortfolioData } from "../types";
import { ArrowDown, Mail, MapPin, Briefcase, FileText, Figma, Phone } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  portfolioData: PortfolioData;
  activeThemeAccent: string;
  activeThemeText: string;
}

export default function Hero({ portfolioData, activeThemeAccent, activeThemeText }: HeroProps) {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Generate a beautiful abstract grid background
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center py-20 px-6 overflow-hidden">
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-slate-800/60 to-transparent" />
        <div className="absolute top-0 left-[50%] w-[1px] h-full bg-gradient-to-b from-slate-800/60 to-transparent" />
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-slate-800/60 to-transparent" />
        <div className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />
        <div className="absolute top-[70%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/40 to-transparent" />
        
        {/* Glow effect */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r ${activeThemeAccent} blur-[120px] opacity-10`} />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/60 backdrop-blur-md mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
            Open for Product Design Intern Roles
          </span>
        </motion.div>

        {/* Name display */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white font-sans leading-[0.9] uppercase mb-6"
        >
          CRAFTING DIGITAL <br />
          <span className={`bg-gradient-to-r ${activeThemeAccent} bg-clip-text text-transparent`}>
            {portfolioData.name ? portfolioData.name.toUpperCase() : "ECOSYSTEMS"}
          </span>
          <span className="text-slate-500">.</span>
        </motion.h1>

        {/* Engineering header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg font-bold text-slate-300 mt-4 tracking-wider flex items-center gap-2.5 uppercase font-mono"
        >
          <span className={`inline-block w-8 h-1 bg-gradient-to-r ${activeThemeAccent}`}></span>
          {portfolioData.title || "Full Stack Engineer"}
        </motion.h2>

        {/* Bio summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mt-6 font-sans font-normal"
        >
          {portfolioData.bio || "Senior Product Architect specializing in high-performance cloud interfaces and immersive data visualizations."}
        </motion.p>

        {/* Geo indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-x-5 gap-y-2 mt-6 text-xs font-mono text-slate-500"
        >
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{portfolioData.location || "Bangalore, India"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            <span>{portfolioData.email || "vimalakumar202@gmail.com"}</span>
          </div>
          {portfolioData.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{portfolioData.phone}</span>
            </div>
          )}
          {portfolioData.figma && (
            <div className="flex items-center gap-1.5">
              <Figma className="w-3.5 h-3.5" />
              <a href={`https://${portfolioData.figma}`} target="_blank" rel="noreferrer" className="hover:text-white transition">
                {portfolioData.figma}
              </a>
            </div>
          )}
        </motion.div>

        {/* Action button rows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <button
            onClick={scrollToContact}
            className={`px-6 py-3 bg-gradient-to-r ${activeThemeAccent} text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/5 cursor-pointer`}
          >
            Inquire Collaboration
          </button>
          <button
            onClick={scrollToAbout}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold rounded-lg text-xs tracking-wider uppercase transition duration-200 cursor-pointer"
          >
            Explore Profile
          </button>
        </motion.div>
      </div>

      {/* Down indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10 opacity-60 hover:opacity-100 transition"
        onClick={scrollToAbout}
      >
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Scroll Down</span>
        <ArrowDown className={`w-4 h-4 animate-bounce ${activeThemeText}`} />
      </motion.div>
    </section>
  );
}
