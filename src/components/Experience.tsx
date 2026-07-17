import React, { useState } from "react";
import { PortfolioData } from "../types";
import { Briefcase, Calendar, ChevronRight, Activity, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExperienceProps {
  portfolioData: PortfolioData;
  activeThemeText: string;
  activeThemeAccent: string;
}

export default function Experience({ portfolioData, activeThemeText, activeThemeAccent }: ExperienceProps) {
  const [activeJobIdx, setActiveJobIdx] = useState<number>(0);
  const jobs = portfolioData.experience || [];

  return (
    <section id="experience" className="py-24 px-6 border-t border-slate-900 bg-slate-950/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2 mb-16">
          <span className={`font-mono text-xs font-semibold uppercase tracking-[0.3em] ${activeThemeText}`}>
            03 / Professional History
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans uppercase">
            Engineering & Leadership Timeline
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r ${activeThemeAccent} mt-2`}></div>
          <p className="text-xs text-slate-400 max-w-xl mt-3 leading-relaxed">
            A historical roadmap documenting engineering roles, key responsibilities, team leadership, and technical deliveries.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            No work history available. Paste your resume in Studio mode to populate automatically.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Nav: Job Tabs */}
            <div className="md:col-span-4 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible custom-scrollbar gap-1.5 md:gap-2 pb-3 md:pb-0 border-b md:border-b-0 md:border-l border-slate-900">
              {jobs.map((job, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveJobIdx(idx)}
                  className={`py-3.5 px-4 text-left font-mono text-xs tracking-wider rounded-lg transition-all shrink-0 md:shrink flex items-center gap-2.5 cursor-pointer uppercase font-bold ${
                    activeJobIdx === idx
                      ? `text-slate-950 bg-gradient-to-r ${activeThemeAccent} shadow-lg shadow-cyan-400/10`
                      : "text-slate-400 hover:text-white hover:bg-slate-900/30 border-transparent"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 shrink-0" />
                  {job.company}
                </button>
              ))}
            </div>

            {/* Right Panel: Job Details */}
            <div className="md:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeJobIdx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-500/5"
                >
                  {/* Job Header */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
                        {jobs[activeJobIdx].role}
                      </h3>
                      <span className="font-mono text-[9px] text-slate-400 flex items-center gap-1 shrink-0 bg-slate-950 border border-slate-850 py-1 px-3 rounded-full w-fit uppercase font-bold tracking-wider">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {jobs[activeJobIdx].period}
                      </span>
                    </div>
                    
                    <span className={`text-xs font-bold ${activeThemeText} mt-1 uppercase tracking-wider`}>
                      @{jobs[activeJobIdx].company}
                    </span>
                  </div>

                  {/* Job Bullets */}
                  <div className="mt-6">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 font-bold block mb-4">Core Deliveries</span>
                    <ul className="flex flex-col gap-3.5">
                      {jobs[activeJobIdx].description.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="text-xs text-slate-300 flex items-start gap-3 leading-relaxed">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeThemeAccent} mt-1.5 shrink-0`} />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Job Tech Tags */}
                  {jobs[activeJobIdx].tags && jobs[activeJobIdx].tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-850/60">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2.5">Utilized Technologies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {jobs[activeJobIdx].tags.map((tag, tagIdx) => (
                          <span 
                            key={tagIdx}
                            className="font-mono text-[9px] px-2.5 py-1 bg-slate-950 border border-slate-850 text-slate-400 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
