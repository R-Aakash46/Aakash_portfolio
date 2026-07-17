import React, { useState } from "react";
import { defaultPortfolioData } from "./defaultData";
import { PortfolioData } from "./types";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ThemeCustomizer from "./components/ThemeCustomizer";
import { Settings, Eye, Wrench, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(defaultPortfolioData);
  const [activeTheme, setActiveTheme] = useState<string>("slate");
  const [isCustomizeMode, setIsCustomizeMode] = useState<boolean>(false);

  const resetToDefault = () => {
    setPortfolioData(defaultPortfolioData);
  };

  // Resolve theme-specific aesthetic styles
  const getThemeStyles = () => {
    switch (activeTheme) {
      case "emerald":
        return {
          accent: "from-emerald-400 to-teal-500",
          text: "text-emerald-400",
          ring: "focus:ring-emerald-400/50",
          border: "border-emerald-500/20",
          glow: "bg-emerald-500/10"
        };
      case "royal":
        return {
          accent: "from-indigo-400 to-purple-500",
          text: "text-indigo-400",
          ring: "focus:ring-indigo-400/50",
          border: "border-indigo-500/20",
          glow: "bg-indigo-500/10"
        };
      case "amber":
        return {
          accent: "from-amber-400 to-orange-500",
          text: "text-amber-400",
          ring: "focus:ring-amber-400/50",
          border: "border-amber-500/20",
          glow: "bg-amber-500/10"
        };
      case "slate":
      default:
        return {
          accent: "from-cyan-400 to-blue-500",
          text: "text-cyan-400",
          ring: "focus:ring-cyan-400/50",
          border: "border-cyan-500/20",
          glow: "bg-cyan-500/10"
        };
    }
  };

  const { accent: themeAccent, text: themeText } = getThemeStyles();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans transition-colors duration-500 selection:bg-cyan-400/20 selection:text-cyan-200 relative overflow-hidden">
      
      {/* Immersive Background Accents */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[45%] right-[10%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      {/* Header */}
      <Header 
        portfolioData={portfolioData}
        activeThemeAccent={themeAccent}
        isCustomizeMode={isCustomizeMode}
        setIsCustomizeMode={setIsCustomizeMode}
      />

      {/* Main Layout Container */}
      <main className="flex-1 flex flex-col pt-20">
        
        {/* If Studio (Customize) Mode is active, split the viewport */}
        {isCustomizeMode ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-stretch h-[calc(100vh-80px)] overflow-hidden relative">
            
            {/* Left: Beautiful Live Portfolio Preview */}
            <div className="lg:col-span-8 overflow-y-auto custom-scrollbar border-r border-slate-900 bg-slate-950/60 flex flex-col">
              
              {/* Floating warning about API integration */}
              <div className="bg-slate-900/90 border-b border-slate-800 py-3 px-6 flex items-center justify-between gap-3 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                    Interactive Portfolio Playground Active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">Changes render in real-time</span>
                </div>
              </div>

              <div className="flex-1">
                <Hero portfolioData={portfolioData} activeThemeAccent={themeAccent} activeThemeText={themeText} />
                <About portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
                <Projects portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
                <Experience portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
                <Skills portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
                <Contact portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
              </div>
            </div>

            {/* Right: Studio Customizer panel */}
            <div className="lg:col-span-4 p-5 bg-slate-950 overflow-hidden h-full flex flex-col border-t lg:border-t-0 border-slate-900">
              <ThemeCustomizer
                portfolioData={portfolioData}
                setPortfolioData={setPortfolioData}
                resetToDefault={resetToDefault}
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
              />
            </div>

          </div>
        ) : (
          /* Normal Viewer Mode: Full Viewport */
          <div className="w-full">
            <Hero portfolioData={portfolioData} activeThemeAccent={themeAccent} activeThemeText={themeText} />
            <About portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
            <Projects portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
            <Experience portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
            <Skills portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
            <Contact portfolioData={portfolioData} activeThemeText={themeText} activeThemeAccent={themeAccent} />
          </div>
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="py-8 border-t border-slate-900 bg-[#020617] text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Available for Freelance & Select Roles
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span>Based in {portfolioData.location || "Bangalore, India"}</span>
          </div>
          <div className="flex items-center gap-6">
            {portfolioData.linkedin && (
              <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition cursor-pointer">
                LinkedIn
              </a>
            )}
            {portfolioData.github && (
              <a href={`https://${portfolioData.github}`} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition cursor-pointer">
                GitHub
              </a>
            )}
            <span className="text-slate-700">|</span>
            <span className="text-slate-600 font-mono tracking-widest text-[9px]">
              &copy; {new Date().getFullYear()} {portfolioData.name || "Candidate"}
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Action Button to toggle Studio mode */}
      <button
        onClick={() => setIsCustomizeMode(!isCustomizeMode)}
        className="fixed bottom-6 right-6 z-40 p-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group flex items-center gap-2 overflow-hidden max-w-[56px] hover:max-w-[180px] cursor-pointer"
        title="Toggle Customizer Studio"
      >
        <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
          {isCustomizeMode ? (
            <Eye className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          ) : (
            <Settings className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
          )}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isCustomizeMode ? "View Portfolio" : "Open Studio"}
        </span>
      </button>
    </div>
  );
}
