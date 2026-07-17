import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail, Figma } from "lucide-react";
import { PortfolioData } from "../types";

interface HeaderProps {
  portfolioData: PortfolioData;
  activeThemeAccent: string;
  isCustomizeMode: boolean;
  setIsCustomizeMode: (mode: boolean) => void;
}

export default function Header({
  portfolioData,
  activeThemeAccent,
  isCustomizeMode,
  setIsCustomizeMode
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const menuItems = [
    { label: "Intro", id: "hero" },
    { label: "About", id: "about" },
    { label: "Featured", id: "projects" },
    { label: "Timeline", id: "experience" },
    { label: "Skills", id: "skills" },
    { label: "Inquire", id: "contact" }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
      isScrolled 
        ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900 py-3.5" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${activeThemeAccent} rounded-lg flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-400/20 shrink-0`}>
            {portfolioData.name ? portfolioData.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() : "VK"}
          </div>
          <span className="text-sm font-bold tracking-widest uppercase text-white font-display hidden sm:inline-block">
            {portfolioData.name || "Vimal Kumar"}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-white transition duration-200 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mode Toggles & Social Links */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsCustomizeMode(!isCustomizeMode)}
            className={`font-sans text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition duration-200 cursor-pointer ${
              isCustomizeMode 
                ? "bg-cyan-400/10 border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/20" 
                : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
            }`}
          >
            {isCustomizeMode ? "Studio Live" : "Open Studio"}
          </button>

          {portfolioData.github && (
            <a
              href={`https://${portfolioData.github}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {portfolioData.linkedin && (
            <a
              href={`https://${portfolioData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {portfolioData.figma && (
            <a
              href={`https://${portfolioData.figma}`}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition"
              title="Figma"
            >
              <Figma className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsCustomizeMode(!isCustomizeMode)}
            className={`font-sans text-[10px] font-bold px-2.5 py-1 rounded-full border transition duration-200 ${
              isCustomizeMode 
                ? "bg-cyan-400/10 border-cyan-400/30 text-cyan-400" 
                : "bg-slate-900 border-slate-800 text-slate-300"
            }`}
          >
            {isCustomizeMode ? "Studio Live" : "Open Studio"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-slate-400 hover:text-white transition"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 py-6 px-6 flex flex-col gap-5 absolute top-full left-0 w-full z-50 shadow-2xl">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-white text-left transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4 pt-4 border-t border-slate-900">
            {portfolioData.github && (
              <a
                href={`https://${portfolioData.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono"
              >
                <Github className="w-4 h-4" /> Github
              </a>
            )}
            {portfolioData.linkedin && (
              <a
                href={`https://${portfolioData.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono"
              >
                <Linkedin className="w-4 h-4" /> Linkedin
              </a>
            )}
            {portfolioData.figma && (
              <a
                href={`https://${portfolioData.figma}`}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition flex items-center gap-1 text-xs font-mono"
              >
                <Figma className="w-4 h-4" /> Figma
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
