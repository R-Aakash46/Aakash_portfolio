import React from "react";
import { PortfolioData } from "../types";
import { CheckCircle2, ChevronRight, HardDrive, Terminal, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface SkillsProps {
  portfolioData: PortfolioData;
  activeThemeText: string;
  activeThemeAccent: string;
}

export default function Skills({ portfolioData, activeThemeText, activeThemeAccent }: SkillsProps) {
  const skillGroups = portfolioData.skills || [];

  return (
    <section id="skills" className="py-24 px-6 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2 mb-16">
          <span className={`font-mono text-xs font-semibold uppercase tracking-[0.3em] ${activeThemeText}`}>
            04 / Competencies
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans uppercase">
            Technical Matrix & Stack
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r ${activeThemeAccent} mt-2`}></div>
          <p className="text-xs text-slate-400 max-w-xl mt-3 leading-relaxed">
            Proficiencies rated across main software domains. These ratings correspond to professional usage, architecture depths, and runtime optimizations.
          </p>
        </div>

        {skillGroups.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-slate-800 rounded-xl text-slate-500 text-xs">
            No technical skills mapped yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillGroups.map((group, groupIdx) => (
              <div 
                key={groupIdx}
                className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 shadow-2xl shadow-cyan-500/5"
              >
                {/* Accent bar from design theme */}
                <div className={`w-6 h-0.5 bg-gradient-to-r ${activeThemeAccent} mb-4`}></div>

                {/* Category Header */}
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800/80 pb-3 mb-5 flex items-center gap-2">
                  <Terminal className={`w-4 h-4 ${activeThemeText}`} />
                  {group.category}
                </h3>

                {/* Skill Bars */}
                <div className="flex flex-col gap-4.5">
                  {group.items.map((skill, skillIdx) => (
                    <div key={skillIdx} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans font-medium text-slate-300">{skill.name}</span>
                        <span className="font-mono text-slate-500 text-[10px]">{skill.level}%</span>
                      </div>
                      
                      {/* Progress Bar Track */}
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: skillIdx * 0.05 }}
                          className={`h-full bg-gradient-to-r ${activeThemeAccent} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
