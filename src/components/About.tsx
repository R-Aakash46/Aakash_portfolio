import React from "react";
import { PortfolioData } from "../types";
import { GraduationCap, Award, BookOpen, MapPin, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface AboutProps {
  portfolioData: PortfolioData;
  activeThemeText: string;
  activeThemeAccent: string;
}

export default function About({ portfolioData, activeThemeText, activeThemeAccent }: AboutProps) {
  // Extract number of years of experience if available, default to "8+" or similar
  const yearsExp = portfolioData.experience && portfolioData.experience.length > 0 
    ? `${portfolioData.experience.length * 2 + 1}+` 
    : "8+";

  const [imgSrc, setImgSrc] = React.useState("/1000147191.png");
  const [imgError, setImgError] = React.useState(false);

  const handleImgError = () => {
    if (imgSrc === "/1000147191.png") {
      setImgSrc("1000147191.png");
    } else if (imgSrc === "1000147191.png") {
      setImgSrc("/public/1000147191.png");
    } else {
      setImgError(true);
    }
  };

  return (
    <section id="about" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20 relative overflow-hidden">
      {/* Dynamic Glowing Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2 mb-16">
          <span className={`font-mono text-xs font-semibold uppercase tracking-[0.3em] ${activeThemeText}`}>
            01 / Professional Profile
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans uppercase">
            Architecting Robust Digital Solutions
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r ${activeThemeAccent} mt-2`}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Column 1: Immersive Visual Avatar & Experience Badge */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="aspect-square w-full rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-800 p-2 shadow-2xl relative overflow-hidden select-none">
              <div className="w-full h-full rounded-[1.25rem] bg-slate-900 flex items-center justify-center overflow-hidden transition-all duration-500 relative">
                {/* Visual representation of the professional */}
                {!imgError ? (
                  <img 
                    src={imgSrc}
                    alt="Aakash R"
                    className="w-full h-full object-cover transition-all duration-500 rounded-[1rem] hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={handleImgError}
                  />
                ) : (
                  <div className="w-full h-full rounded-[1rem] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center select-none border border-slate-800">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${activeThemeAccent} flex items-center justify-center text-slate-950 font-sans font-black text-3xl tracking-tight shadow-lg shadow-indigo-500/10 mb-3`}>
                      AR
                    </div>
                    <span className="text-white text-sm font-bold tracking-wider uppercase font-sans">Aakash R</span>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 tracking-widest uppercase">UI/UX Designer</span>
                  </div>
                )}
              </div>
              <div className={`absolute -bottom-4 -right-4 bg-gradient-to-br ${activeThemeAccent} text-slate-950 p-4 rounded-2xl shadow-xl font-sans shrink-0 min-w-[110px] text-center`}>
                <div className="text-2xl font-black italic tracking-tighter">UG</div>
                <div className="text-[8px] uppercase font-bold tracking-widest mt-0.5">Design Intern</div>
              </div>
            </div>

            {/* Special Recognition badge matching the design's "Award Winning" panel */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-center items-center text-center border-dashed mt-4">
              <div className={`${activeThemeText} mb-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-1">Professional Focus</p>
              <p className="text-xs text-slate-300 font-medium italic">"Bridging User Research and Interactive Prototypes"</p>
            </div>
          </div>

          {/* Column 2: Biography & Philosophy */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Biography</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-sans font-normal">
                {portfolioData.longBio || "No extended biography specified. Paste your resume in Studio mode to populate automatically."}
              </p>
            </div>
            
            <div className="p-5 rounded-2xl bg-slate-900/35 border border-slate-850">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500 font-bold block mb-2">Core Design Philosophy</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Believes in bridging user research and high-fidelity, developer-ready prototypes. Translates complex usability challenges into clean information architectures and intuitive systems. Fluency in HTML, CSS, and JavaScript means all product layouts are built for implementation realism.
              </p>
            </div>
          </div>

          {/* Column 3: Credentials (Education & Certifications) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Education Sub-section */}
            {portfolioData.education && portfolioData.education.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <GraduationCap className={`w-4 h-4 ${activeThemeText}`} />
                  Education
                </h3>
                <div className="flex flex-col gap-4">
                  {portfolioData.education.slice(0, 2).map((edu, idx) => (
                    <div 
                      key={idx}
                      className="p-4 bg-slate-900/30 border border-slate-850 rounded-xl flex flex-col gap-1 hover:border-slate-800 transition-all duration-300"
                    >
                      <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                      <span className="font-bold text-xs text-slate-200">{edu.degree}</span>
                      <span className="text-[11px] text-slate-400">{edu.school}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Sub-section */}
            {portfolioData.certifications && portfolioData.certifications.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <Award className={`w-4 h-4 ${activeThemeText}`} />
                  Certifications
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {portfolioData.certifications.map((cert, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 bg-slate-900/30 border border-slate-850 rounded-xl flex justify-between items-center gap-3 hover:border-slate-800 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-semibold text-xs text-slate-200 leading-tight">{cert.title}</span>
                        <span className="text-[10px] text-slate-500 font-medium">{cert.issuer}</span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded shrink-0">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Sub-section */}
            {portfolioData.languages && portfolioData.languages.length > 0 && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${activeThemeText}`} />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {portfolioData.languages.map((lang, idx) => (
                    <span 
                      key={idx}
                      className="font-mono text-[9px] px-3 py-1 bg-slate-900/40 border border-slate-850 text-slate-300 rounded-md uppercase font-bold tracking-wider"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
          </div>

        </div>
      </div>
    </section>
  );
}
