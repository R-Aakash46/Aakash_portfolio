import React, { useState } from "react";
import { PortfolioData, Project } from "../types";
import { 
  FolderGit2, ExternalLink, Github, ArrowRight, X, Layers, Code, Play,
  Users, Compass, Map, ListChecks, Sparkles, TrendingUp, Check, FileText, 
  Layout, Activity, ChevronRight, Clock, Target, Award, Zap, BookOpen, 
  UserCheck, Shield, CheckSquare, Laptop, AlertCircle, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsProps {
  portfolioData: PortfolioData;
  activeThemeText: string;
  activeThemeAccent: string;
}

type TabType = "overview" | "personas" | "flow" | "sitemap" | "wireframes" | "principles";

export default function Projects({ portfolioData, activeThemeText, activeThemeAccent }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // State for interactive PermitFlow wireframe demo
  const [permitFlowStatus, setPermitFlowStatus] = useState<"submitted" | "under_review" | "verified" | "approved">("under_review");

  // State for interactive CrackChamp wireframe demo
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // State for interactive BillEase wireframe demo
  const [billEaseCustomer, setBillEaseCustomer] = useState<string>("Acme Corp");
  const [billEaseAmount, setBillEaseAmount] = useState<number>(4200);
  const [billEaseTax, setBillEaseTax] = useState<number>(10); // 10%
  const [billEaseStatus, setBillEaseStatus] = useState<"draft" | "sent" | "paid">("paid");
  const [billEaseLogoPos, setBillEaseLogoPos] = useState<"left" | "right" | "none">("left");
  const [billEaseColor, setBillEaseColor] = useState<"blue" | "emerald" | "slate">("blue");
  const [billEaseShowTax, setBillEaseShowTax] = useState<boolean>(true);
  const [billEaseExporting, setBillEaseExporting] = useState<boolean>(false);
  const [billEaseExportSuccess, setBillEaseExportSuccess] = useState<boolean>(false);

  const projectsList = portfolioData.projects || [];
  const featuredProjects = projectsList.filter(p => p.featured);
  const otherProjects = projectsList.filter(p => !p.featured);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveTab("overview");
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
  };

  return (
    <section id="projects" className="py-24 px-6 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2 mb-16">
          <span className={`font-mono text-xs font-semibold uppercase tracking-[0.3em] ${activeThemeText}`}>
            02 / Case Studies & Projects
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans uppercase">
            Product Design & UX Portfolios
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r ${activeThemeAccent} mt-2`}></div>
          <p className="text-xs text-slate-400 max-w-xl mt-3 leading-relaxed">
            Curated UX case studies featuring deep information architecture, persona empathy maps, simplified user flows, and responsive visual prototypes.
          </p>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, idx) => (
            <div 
              key={idx}
              onClick={() => handleProjectClick(project)}
              className="group relative bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden shadow-2xl shadow-cyan-500/5 hover:shadow-cyan-400/10"
            >
              {/* Highlight Overlay glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-400/5 blur-2xl group-hover:bg-cyan-400/10 transition-all pointer-events-none" />

              <div>
                {/* Vertical accent bar from design theme */}
                <div className={`w-8 h-1 bg-gradient-to-r ${activeThemeAccent} mb-5`}></div>

                <div className="flex justify-between items-center gap-3 mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-wider shrink-0">
                    Featured UX Case
                  </span>
                </div>
                
                <span className="text-xs font-semibold text-slate-400 block mt-1 italic">
                  {project.subtitle}
                </span>

                <p className="text-xs text-slate-400 mt-3.5 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Template Thumbnail representation inside card */}
              <div className="mt-5 rounded-lg overflow-hidden border border-slate-800/80 bg-slate-950/40 p-2 relative h-28 flex items-center justify-center">
                {project.title === "PermitFlow" ? (
                  <div className="w-full h-full flex flex-col gap-1 text-[8px] font-mono p-2 bg-slate-950 rounded select-none opacity-80 group-hover:opacity-100 transition duration-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-indigo-400">PermitFlow // Command</span>
                      <span className="text-slate-500 text-[6px]">Active Incident Map</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-1 text-[6px]">
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Active Incidents</div>
                        <div className="text-white font-bold">21</div>
                      </div>
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Severe Alerts</div>
                        <div className="text-rose-400 font-bold">3</div>
                      </div>
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Response</div>
                        <div className="text-emerald-400 font-bold">7.8m</div>
                      </div>
                    </div>
                  </div>
                ) : project.title === "BillEase" ? (
                  <div className="w-full h-full flex flex-col gap-1 text-[8px] font-mono p-2 bg-slate-950 rounded select-none opacity-80 group-hover:opacity-100 transition duration-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-blue-400">BillEase // Smart Billing</span>
                      <span className="text-emerald-400 text-[6px]">Revenue: $45,670</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mt-1 text-[6px]">
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Pending</div>
                        <div className="text-amber-400 font-bold">$8,240</div>
                      </div>
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Paid</div>
                        <div className="text-emerald-400 font-bold">92%</div>
                      </div>
                      <div className="bg-slate-900 p-1 rounded border border-slate-800">
                        <div className="text-slate-500">Invoices</div>
                        <div className="text-blue-400 font-bold">148</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col gap-1 text-[8px] font-mono p-2 bg-slate-950 rounded select-none opacity-80 group-hover:opacity-100 transition duration-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-violet-400">CrackChamp // Adaptive</span>
                      <span className="text-emerald-400 text-[6px]">Streak: 12 Days</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full border border-violet-500/30 flex items-center justify-center text-white text-[6px] bg-violet-950/30">74%</div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="text-slate-400 text-[6px]">Goal: Mock Exam Score Projection</div>
                        <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-[74%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-850/60">
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag, tagIdx) => (
                    <span 
                      key={tagIdx}
                      className="font-mono text-[9px] px-2 py-0.5 bg-slate-950/70 border border-slate-850 text-slate-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors pt-1">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    Open UX Case Study
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Index Section */}
        {otherProjects.length > 0 && (
          <div className="mt-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Additional Contributions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleProjectClick(project)}
                  className="group bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl shadow-cyan-500/1"
                >
                  <div>
                    {/* Vertical accent mini bar */}
                    <div className={`w-6 h-0.5 bg-gradient-to-r ${activeThemeAccent} mb-4`}></div>

                    <div className="flex justify-between items-center mb-3">
                      <Layers className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Spec Sheet</span>
                    </div>
                    <h4 className="font-bold text-slate-200 tracking-tight group-hover:text-white transition-all uppercase text-sm">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-850/50">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span key={tagIdx} className="font-mono text-[8px] px-1.5 py-0.5 bg-slate-950 border border-slate-850 text-slate-500 rounded">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="font-mono text-[8px] px-1.5 py-0.5 text-slate-600">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 transition flex items-center gap-1">
                      Read specs <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECT DETAILS MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-slate-950 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
              >
                {/* Top Glowing Header Accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activeThemeAccent}`} />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-1.5 bg-slate-900 border border-slate-800 rounded-full z-20"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Custom Tabbed UX Case Study Header */}
                <div className="bg-slate-900/80 border-b border-slate-800/80 p-6 sm:p-8 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 animate-pulse" />
                        UX Case Study Portfolio Specification
                      </span>
                      <h3 className="text-xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                        {selectedProject.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 block italic mt-1 font-sans">
                        {selectedProject.subtitle}
                      </span>
                    </div>

                    {/* Quick Launch Direct Figma Link */}
                    {selectedProject.liveUrl && (
                      <a 
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-slate-950 font-sans text-xs font-black tracking-tight rounded-xl flex items-center gap-2 transition hover:opacity-90 shrink-0 shadow-lg shadow-indigo-500/10"
                      >
                        <Play className="w-3.5 h-3.5 fill-slate-950 stroke-[3]" />
                        Launch Figma Prototype
                      </a>
                    )}
                  </div>

                  {/* Sub-navigation Tabs (Only for PermitFlow, CrackChamp & BillEase) */}
                  {(selectedProject.title === "PermitFlow" || selectedProject.title === "CrackChamp" || selectedProject.title === "BillEase") && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60 font-mono text-[10px]">
                      {[
                        { id: "overview", label: "Mockup & Overview", icon: Laptop },
                        { id: "personas", label: "1. User Personas", icon: Users },
                        { id: "flow", label: "2. User Flow", icon: Compass },
                        { id: "sitemap", label: "3. Sitemap / IA", icon: Map },
                        { id: "wireframes", label: "4. Interactive Concept", icon: ListChecks },
                        { id: "principles", label: "5. Design Principles", icon: Sparkles }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabType)}
                            className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all duration-200 border ${
                              isActive 
                                ? "bg-indigo-600/15 border-indigo-500/40 text-indigo-300 font-bold shadow-sm" 
                                : "bg-slate-950/60 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 shrink-0" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Case Study Scrollable Content */}
                <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-950">
                  
                  {/* TAB 1: OVERVIEW & INTERACTIVE VISUAL TEMPLATE */}
                  {activeTab === "overview" && (
                    <div className="flex flex-col gap-6">
                      
                      {/* Interactive Visual Template (Pure CSS Dashboard Mockup) */}
                      {(selectedProject.title === "PermitFlow" || selectedProject.title === "CrackChamp" || selectedProject.title === "BillEase") && (
                        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-1.5 shadow-2xl relative">
                          {/* Browser Toolbar / Window Decorator */}
                          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-850 bg-slate-950/80 rounded-t-xl text-[10px] font-mono text-slate-500 select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                            </div>
                            <div className="bg-slate-900 border border-slate-850 px-6 py-0.5 rounded-md max-w-xs truncate text-slate-400 flex items-center gap-1.5">
                              <Shield className="w-3 h-3 text-emerald-400" />
                              {selectedProject.title === "PermitFlow" ? "permitflow.gov/dashboard" : selectedProject.title === "BillEase" ? "billease.io/dashboard" : "crackchamp.edu/learn"}
                            </div>
                            <span className="text-[8px] uppercase tracking-wider text-slate-500">Local Cache OK</span>
                          </div>

                          {/* Dynamic Custom-Built Mockup Sandbox */}
                          {selectedProject.title === "PermitFlow" ? (
                            <div className="bg-slate-950/95 p-4 sm:p-6 text-slate-300 font-sans text-xs flex flex-col gap-4 min-h-[300px]">
                              {/* PermitFlow Mockup Header */}
                              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center font-black text-white text-[10px]">PF</div>
                                  <span className="font-black text-white uppercase font-sans tracking-tight">PermitFlow <span className="text-slate-500 text-[10px] font-normal lowercase font-mono">command center</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-[9px] bg-slate-900 border border-indigo-900/30 text-indigo-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span> ISO 27001 System
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[8px]">AR</div>
                                    <span className="text-[10px] text-slate-300 hidden sm:inline">Aakash R (Active)</span>
                                  </div>
                                </div>
                              </div>

                              {/* Title block */}
                              <div className="text-center py-4 bg-gradient-to-b from-indigo-950/20 to-transparent rounded-xl border border-indigo-950/35 px-4">
                                <h4 className="text-sm sm:text-lg font-black text-white font-sans uppercase tracking-tight">
                                  Emergency Permissions, <span className="text-indigo-400">Simplified.</span>
                                </h4>
                                <p className="text-[10px] text-slate-400 max-w-md mx-auto mt-1">
                                  Enterprise-grade portal for critical infrastructure access. Streamlining permit workflows with real-time status and security.
                                </p>
                              </div>

                              {/* Grid Widgets */}
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                {[
                                  { label: "Active Incidents", value: "21", color: "text-indigo-400" },
                                  { label: "Severe Alerts", value: "3", color: "text-rose-400" },
                                  { label: "Resources Deployed", value: "165", color: "text-blue-400" },
                                  { label: "Staff Availability", value: "88%", color: "text-cyan-400" },
                                  { label: "Response Time", value: "7.8 min", color: "text-emerald-400" }
                                ].map((stat, sIdx) => (
                                  <div key={sIdx} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex flex-col justify-between">
                                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                    <span className={`text-sm sm:text-lg font-black mt-1 ${stat.color}`}>{stat.value}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Map & List Split preview */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-1">
                                <div className="md:col-span-8 bg-slate-900 border border-slate-850 rounded-xl p-3 relative overflow-hidden h-40">
                                  <div className="absolute top-2 left-2 bg-slate-950/80 border border-slate-800 text-[8px] font-mono px-2 py-0.5 rounded text-indigo-300 z-10 uppercase font-bold">
                                    Emergency Resource Ingress Map
                                  </div>
                                  
                                  {/* Fake Map Elements */}
                                  <div className="absolute inset-0 bg-slate-900/20 flex items-center justify-center select-none opacity-50">
                                    <div className="w-full h-full border border-indigo-950/20 relative">
                                      <div className="absolute top-1/4 left-1/3 w-16 h-1 bg-indigo-950 rounded rotate-12"></div>
                                      <div className="absolute top-1/2 left-1/4 w-20 h-0.5 bg-indigo-950 rounded -rotate-45"></div>
                                      <div className="absolute top-1/3 left-1/2 w-24 h-1 bg-indigo-950 rounded rotate-45"></div>
                                    </div>
                                  </div>

                                  {/* Pulsing map nodes representing live activity from screenshot */}
                                  <div className="absolute top-12 left-20 flex flex-col items-center">
                                    <div className="w-3 h-3 bg-rose-500 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg animate-ping"></div>
                                    <div className="w-2 h-2 bg-rose-500 rounded-full absolute top-0.5"></div>
                                    <span className="text-[6px] font-mono bg-slate-950 px-1 rounded text-rose-400 border border-rose-900/40 mt-1">HOSPITAL_A</span>
                                  </div>

                                  <div className="absolute top-20 right-28 flex flex-col items-center">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg animate-ping"></div>
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-0.5"></div>
                                    <span className="text-[6px] font-mono bg-slate-950 px-1 rounded text-indigo-400 border border-indigo-900/40 mt-1">SYS_INGRESS</span>
                                  </div>

                                  <div className="absolute bottom-6 left-32 flex flex-col items-center">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-lg animate-ping"></div>
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full absolute top-0.5"></div>
                                    <span className="text-[6px] font-mono bg-slate-950 px-1 rounded text-emerald-400 border border-emerald-900/40 mt-1">DEPOT_WEST</span>
                                  </div>
                                </div>

                                <div className="md:col-span-4 bg-slate-900 border border-slate-850 rounded-xl p-3 flex flex-col justify-between h-40">
                                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-850 pb-1.5">Live Incident Feed</span>
                                  <div className="flex flex-col gap-1.5 overflow-y-auto max-h-24 custom-scrollbar flex-1 mt-1 text-[9px] font-mono">
                                    <div className="p-1 rounded bg-rose-950/20 border border-rose-900/20 text-rose-400 flex justify-between">
                                      <span>[ALERT] Site A Ingress Blocked</span>
                                      <span>1m ago</span>
                                    </div>
                                    <div className="p-1 rounded bg-indigo-950/20 border border-indigo-900/20 text-indigo-400 flex justify-between">
                                      <span>[INFO] Dispatch Route Updated</span>
                                      <span>5m ago</span>
                                    </div>
                                    <div className="p-1 rounded bg-emerald-950/20 border border-emerald-900/20 text-emerald-400 flex justify-between">
                                      <span>[OK] Hospital B Clear</span>
                                      <span>12m ago</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : selectedProject.title === "BillEase" ? (
                            <div className="bg-slate-950/95 p-4 sm:p-6 text-slate-300 font-sans text-xs flex flex-col gap-4 min-h-[300px]">
                              {/* BillEase Mockup Header */}
                              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-[10px]">BE</div>
                                  <span className="font-black text-white uppercase font-sans tracking-tight">BillEase <span className="text-blue-400 text-[10px] font-normal lowercase font-mono">smart billing portal</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-[9px] bg-slate-900 border border-blue-900/30 text-blue-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    🟢 System Live
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[8px]">AR</div>
                                    <span className="text-[10px] text-slate-300 hidden sm:inline">Aakash R (Admin)</span>
                                  </div>
                                </div>
                              </div>

                              {/* Core Metrics Cards Row */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                  { label: "Total Revenue", value: "$45,670.80", change: "+12.4%", changeColor: "text-emerald-400" },
                                  { label: "Outstanding Invoices", value: "$8,240.50", change: "-2.1%", changeColor: "text-emerald-400" },
                                  { label: "Expenses", value: "$15,900.20", change: "+5.3%", changeColor: "text-amber-400" },
                                  { label: "Net Profit", value: "$29,770.60", change: "+10.5%", changeColor: "text-emerald-400" }
                                ].map((stat, sIdx) => (
                                  <div key={sIdx} className="bg-slate-900 border border-slate-850 p-2.5 rounded-xl flex flex-col justify-between">
                                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                    <div className="flex items-baseline justify-between gap-1 mt-1">
                                      <span className="text-xs sm:text-sm font-black text-white">{stat.value}</span>
                                      <span className={`text-[7px] font-mono font-bold ${stat.changeColor}`}>{stat.change}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Interactive Split Sandbox */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-1">
                                {/* Left Side: Creator Controls */}
                                <div className="md:col-span-5 bg-slate-900/60 border border-slate-850 rounded-xl p-3 flex flex-col gap-3">
                                  <div>
                                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-850 pb-1.5">Interactive Invoice Builder</span>
                                    
                                    {/* Customer Selection */}
                                    <div className="mt-2.5 flex flex-col gap-1">
                                      <label className="text-[8px] font-mono text-slate-400">Select Customer</label>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        {["Acme Corp", "Stellar Inc", "Aperture Labs"].map((cust) => (
                                          <button
                                            key={cust}
                                            onClick={() => setBillEaseCustomer(cust)}
                                            className={`py-1 px-1.5 rounded text-[8px] font-mono border text-center transition ${
                                              billEaseCustomer === cust 
                                                ? "bg-blue-600/15 border-blue-500 text-blue-300 font-bold" 
                                                : "bg-slate-950/60 border-slate-855 text-slate-400 hover:text-slate-200"
                                            }`}
                                          >
                                            {cust}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Amount Slider / Input */}
                                    <div className="mt-3 flex flex-col gap-1">
                                      <div className="flex justify-between items-center text-[8px] font-mono">
                                        <span className="text-slate-400">Base Amount</span>
                                        <span className="text-blue-400 font-bold">${billEaseAmount}</span>
                                      </div>
                                      <input 
                                        type="range" 
                                        min="500" 
                                        max="10000" 
                                        step="500"
                                        value={billEaseAmount}
                                        onChange={(e) => setBillEaseAmount(Number(e.target.value))}
                                        className="w-full accent-blue-500 h-1 bg-slate-955 rounded-lg appearance-none cursor-pointer"
                                      />
                                    </div>

                                    {/* Tax Input */}
                                    <div className="mt-3 flex flex-col gap-1">
                                      <div className="flex justify-between items-center text-[8px] font-mono">
                                        <span className="text-slate-400">Tax Rate</span>
                                        <span className="text-blue-400 font-bold">{billEaseTax}%</span>
                                      </div>
                                      <div className="flex gap-1.5">
                                        {[0, 5, 10, 18].map((t) => (
                                          <button
                                            key={t}
                                            onClick={() => setBillEaseTax(t)}
                                            className={`flex-1 py-1 rounded text-[8px] font-mono border text-center transition ${
                                              billEaseTax === t 
                                                ? "bg-blue-600/15 border-blue-500 text-blue-300 font-bold" 
                                                : "bg-slate-950/60 border-slate-855 text-slate-400 hover:text-slate-200"
                                            }`}
                                          >
                                            {t}%
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Status Controls */}
                                    <div className="mt-3 flex flex-col gap-1">
                                      <label className="text-[8px] font-mono text-slate-400">Billing Status</label>
                                      <div className="grid grid-cols-3 gap-1.5">
                                        {(["draft", "sent", "paid"] as const).map((st) => (
                                          <button
                                            key={st}
                                            onClick={() => setBillEaseStatus(st)}
                                            className={`py-1 rounded text-[8px] font-mono border text-center capitalize transition ${
                                              billEaseStatus === st 
                                                ? st === "paid" 
                                                  ? "bg-emerald-600/15 border-emerald-500 text-emerald-300 font-bold" 
                                                  : st === "sent"
                                                  ? "bg-blue-600/15 border-blue-500 text-blue-300 font-bold"
                                                  : "bg-slate-700/15 border-slate-500 text-slate-300 font-bold"
                                                : "bg-slate-950/60 border-slate-855 text-slate-400 hover:text-slate-200"
                                            }`}
                                          >
                                            {st}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                  </div>
                                </div>

                                {/* Right Side: Live Invoice Preview */}
                                <div className="md:col-span-7 bg-slate-950 border border-slate-850 rounded-xl p-3.5 flex flex-col justify-between h-44 relative overflow-hidden">
                                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                                    <span className={`px-1.5 py-0.5 rounded font-mono text-[6px] font-bold uppercase ${
                                      billEaseStatus === "paid" 
                                        ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/50" 
                                        : billEaseStatus === "sent"
                                        ? "bg-blue-900/30 text-blue-400 border border-blue-900/40"
                                        : "bg-slate-800 text-slate-400 border border-slate-700"
                                    }`}>
                                      {billEaseStatus}
                                    </span>
                                  </div>

                                  <div className="flex flex-col gap-1 text-[8px]">
                                    <div className="flex justify-between items-start border-b border-slate-900 pb-2">
                                      <div>
                                        <div className="text-white font-black uppercase text-[10px]">INVOICE</div>
                                        <div className="font-mono text-slate-500 text-[6px]">REF-2026-0042</div>
                                      </div>
                                      <div className="text-right font-mono text-slate-500 text-[6px]">
                                        <div>Date: July 16, 2026</div>
                                        <div>Due: Aug 16, 2026</div>
                                      </div>
                                    </div>

                                    <div className="mt-2 flex justify-between items-start">
                                      <div>
                                        <div className="text-[6px] font-mono text-slate-500">BILLED TO:</div>
                                        <div className="text-white font-bold">{billEaseCustomer}</div>
                                        <div className="text-slate-400 text-[6px] font-mono font-sans">finance@{billEaseCustomer.toLowerCase().replace(" ", "")}.com</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[6px] font-mono text-slate-500">ISSUED BY:</div>
                                        <div className="text-white font-bold">Aakash Rev</div>
                                        <div className="text-slate-400 text-[6px] font-mono">billing@billease.io</div>
                                      </div>
                                    </div>

                                    <div className="mt-3 border-t border-slate-900 pt-2 flex justify-between font-mono text-[7px] text-slate-400">
                                      <span>Software Engineering & UX Consulting</span>
                                      <span className="text-white font-bold">${billEaseAmount.toLocaleString()}</span>
                                    </div>
                                  </div>

                                  <div className="border-t border-slate-900 pt-1.5 flex justify-between items-end">
                                    <span className="text-[6px] font-mono text-slate-500">
                                      * Live Calculated Tax Rate: {billEaseTax}%
                                    </span>
                                    <div className="text-right">
                                      <div className="text-[6px] font-mono text-slate-500">Total Invoice Due</div>
                                      <div className="text-xs font-black text-emerald-400">
                                        ${(billEaseAmount + (billEaseAmount * billEaseTax / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-slate-950/95 p-4 sm:p-6 text-slate-300 font-sans text-xs flex flex-col gap-4 min-h-[300px]">
                              {/* CrackChamp Mockup Header */}
                              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-violet-600 flex items-center justify-center font-black text-white text-[10px]">CC</div>
                                  <span className="font-black text-white uppercase font-sans tracking-tight">CrackChamp <span className="text-violet-400 text-[10px] font-normal lowercase font-mono">adaptive portal</span></span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-[9px] bg-slate-900 border border-violet-900/30 text-violet-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                                    ⚡ Score Projection +15%
                                  </span>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[8px]">SA</div>
                                    <span className="text-[10px] text-slate-300 hidden sm:inline">Sarah (Level 4)</span>
                                  </div>
                                </div>
                              </div>

                              {/* Title block */}
                              <div className="text-center py-4 bg-gradient-to-b from-violet-950/20 to-transparent rounded-xl border border-violet-950/35 px-4">
                                <h4 className="text-sm sm:text-lg font-black text-white font-sans uppercase tracking-tight">
                                  Master Your Exams with <span className="text-violet-400 font-bold">Adaptive Learning.</span>
                                </h4>
                                <p className="text-[10px] text-slate-400 max-w-md mx-auto mt-1">
                                  Map your knowledge gaps and build a personalized curriculum that evolves automatically as you progress.
                                </p>
                              </div>

                              {/* Grid layout */}
                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                                <div className="md:col-span-5 bg-slate-900 border border-slate-850 rounded-xl p-3 flex flex-col justify-between">
                                  <div>
                                    <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-850 pb-1.5">Learning Goals</span>
                                    <div className="flex items-center gap-3 mt-3">
                                      <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-500 flex items-center justify-center font-mono font-bold text-white text-sm bg-violet-950/20 shadow">
                                        74%
                                      </div>
                                      <div className="flex-1 flex flex-col gap-1 text-[9px]">
                                        <div className="text-white font-bold">Mock Exam Target Goal</div>
                                        <div className="text-slate-400">Score Projection: +15% in 7 days</div>
                                        <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1">
                                          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-[74%]"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center justify-between border-t border-slate-850 pt-2.5 mt-4 text-[9px] font-mono text-slate-400">
                                    <span>Streak status:</span>
                                    <span className="text-emerald-400 font-bold">🔥 12 Days Streak!</span>
                                  </div>
                                </div>

                                <div className="md:col-span-7 bg-slate-900 border border-slate-850 rounded-xl p-3 flex flex-col gap-2.5">
                                  <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-850 pb-1.5">AI Recommendations feed</span>
                                  <div className="flex flex-col gap-2 text-[9px] font-sans">
                                    <div className="p-2 bg-slate-950 rounded-lg border border-violet-500/10 flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
                                        <div>
                                          <div className="text-white font-bold">Complete Data Structures Quiz</div>
                                          <div className="text-slate-400 text-[8px]">Target: Weak focus area identified from Quiz #3</div>
                                        </div>
                                      </div>
                                      <span className="font-mono text-[8px] text-violet-400 bg-violet-950/40 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Today</span>
                                    </div>

                                    <div className="p-2 bg-slate-950 rounded-lg border border-slate-850/60 flex items-start justify-between gap-3">
                                      <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                                        <div>
                                          <div className="text-white font-bold">Begin Web Development Module</div>
                                          <div className="text-slate-400 text-[8px]">Suggested concept block to expand core competency</div>
                                        </div>
                                      </div>
                                      <span className="font-mono text-[8px] text-indigo-400 bg-indigo-950/40 px-1.5 py-0.5 rounded font-bold uppercase shrink-0">Next Up</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Project Basic Concept details */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
                        <div className="md:col-span-8 flex flex-col gap-5">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-indigo-400" />
                              Case Core Concept
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-sans">
                              {selectedProject.description}
                            </p>
                          </div>

                          {selectedProject.detailedHighlights && selectedProject.detailedHighlights.length > 0 && (
                            <div>
                              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                                <Code className="w-3.5 h-3.5 text-indigo-400" />
                                Product Milestones & Execution
                              </h4>
                              <ul className="flex flex-col gap-2.5">
                                {selectedProject.detailedHighlights.map((hl, hlIdx) => (
                                  <li key={hlIdx} className="text-xs text-slate-400 flex items-start gap-2.5 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                                    <span>{hl}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-4 flex flex-col gap-4">
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-2">Technical stack</span>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedProject.tags.map((tag, tagIdx) => (
                                <span 
                                  key={tagIdx} 
                                  className="font-mono text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center">
                            <span className="text-[10px] font-mono text-slate-400 block mb-2.5">Explore Interactive Tabs</span>
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                              Use the tabs above to explore the fully mapped UX Process, Information Architecture sitemap nodes, and live Low-Fidelity conceptual wireframes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: USER PERSONAS */}
                  {activeTab === "personas" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">Target User Persona Empathy Mapping</h4>
                        <p className="text-xs text-slate-400">Deep empathy structures to analyze workflow goals and primary frictions for user groups.</p>
                      </div>

                      {selectedProject.title === "PermitFlow" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Applicant Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs shrink-0">
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">Persona 01</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Applicant (Requestor)</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-indigo-300">Who they are:</strong> Medical managers, factory inspectors, construction directors, or community response operators.
                              </p>
                              <p>
                                <strong className="text-indigo-300">Goals:</strong> Submit emergency permission requests rapidly, attach required blueprints or clearance documents, and track status triggers in real-time under high-stakes conditions.
                              </p>
                              <p>
                                <strong className="text-indigo-300">Primary Friction:</strong> Slow manual processing, lack of timeline transparency, complicated fields, and difficulty uploading large documents.
                              </p>
                            </div>
                          </div>

                          {/* Admin Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                                <UserCheck className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Persona 02</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Admin / Approver</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-emerald-300">Who they are:</strong> Government dispatchers, state review coordinators, or authorized administrative reviewers.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Goals:</strong> Quickly review submitted permits, verify identity and technical documents, request clarifications, and approve or decline requests inside a centralized workspace.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Primary Friction:</strong> Cluttered spreadsheets, unorganized reviews, fragmented communications, and high pressure to make rapid dispatch decisions.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : selectedProject.title === "BillEase" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Business Owner Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs shrink-0">
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Persona 01</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Business Owner</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-blue-300">Who they are:</strong> Small and medium business owners who need a fast, organized, and reliable way to create invoices, manage customers, and track payments.
                              </p>
                              <p>
                                <strong className="text-blue-300">Goals:</strong> Quickly create and dispatch invoices, monitor real-time transaction statuses, and maintain client directories without complex accounting training.
                              </p>
                              <p>
                                <strong className="text-blue-300">Primary Friction:</strong> Manual billing calculations, slow and disorganized payment records, and friction when chasing down pending invoices.
                              </p>
                            </div>
                          </div>

                          {/* Accountant/Admin Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                                <UserCheck className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Persona 02</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Accountant / Admin</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-emerald-300">Who they are:</strong> Professional accounts managers or office administrators handling daily business transactions.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Goals:</strong> Standardize invoices, manage client billing lists, view monthly analytics reports, and easily audit historical transactions.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Primary Friction:</strong> Fragmented files, confusing tax calculations, hard-to-read business reports, and manual effort tracking billing histories.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Student Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold text-xs shrink-0">
                                <Users className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-violet-400 uppercase font-bold">Persona 01</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Learner (Student)</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-violet-300">Who they are:</strong> Aspirants preparing for competitive national entrance exams under extreme schedule constraints.
                              </p>
                              <p>
                                <strong className="text-violet-300">Goals:</strong> Take dynamic mock exams, understand precise subject weaknesses, receive AI suggestions, and view projections of progress to stay highly motivated.
                              </p>
                              <p>
                                <strong className="text-violet-300">Primary Friction:</strong> Fatigue from repetitive mock testing, lack of diagnostic insights, confusing layout clutter, and feeling overwhelmed by too many general study materials.
                              </p>
                            </div>
                          </div>

                          {/* Instructor Persona Card */}
                          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col gap-4">
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs shrink-0">
                                <BookOpen className="w-5 h-5" />
                              </div>
                              <div>
                                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Persona 02</span>
                                <h5 className="text-sm font-bold text-white uppercase">The Instructor / Educator</h5>
                              </div>
                            </div>
                            <div className="text-xs text-slate-300 leading-relaxed flex flex-col gap-3">
                              <p>
                                <strong className="text-emerald-300">Who they are:</strong> Coaching faculty members, curriculum developers, or institute coordinators.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Goals:</strong> Manage test banks, publish specialized modules, monitor student cohort metrics, and inspect weak focus patterns to adapt active lecturing styles.
                              </p>
                              <p>
                                <strong className="text-emerald-300">Primary Friction:</strong> Static assessment structures, inability to spot individual concepts students are failing on, and complex analytics that don't output clear action items.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: USER FLOW STEPPER */}
                  {activeTab === "flow" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">Simplified Product User Flow</h4>
                        <p className="text-xs text-slate-400">Strategic walkthrough mapping key transition screens and user experience steps.</p>
                      </div>

                      {selectedProject.title === "PermitFlow" ? (
                        <div className="relative border-l-2 border-indigo-500/30 pl-6 ml-4 flex flex-col gap-8 py-2">
                          {[
                            {
                              step: "01",
                              title: "Discovery & Entry",
                              desc: "The landing page provides immediate, high-trust value propositions. Users quickly log in or register through a distraction-free screen.",
                              badge: "Public Access"
                            },
                            {
                              step: "02",
                              title: "Emergency Request Form Submission",
                              desc: "Interactive dashboard prompts the user with 'Create Permission Request'. A multi-step wizard asks for Category, emergency details, and drag-and-drop document files.",
                              badge: "Applicant Action"
                            },
                            {
                              step: "03",
                              title: "Real-Time Tracking & Timelines",
                              desc: "Once submitted, the applicant is instantly redirected to the Request Details page, hosting a responsive status timeline showing active timestamps and dispatch updates.",
                              badge: "Automatic System Update"
                            },
                            {
                              step: "04",
                              title: "Centralized Review Workspace",
                              desc: "Approvers see requests pop up in their queue. Direct side-by-side previews of attached documents allow reviewers to click 'Verify', 'Request Info', or 'Approve' instantly.",
                              badge: "Admin Decisive Action"
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[35px] top-0.5 bg-indigo-500 text-slate-950 font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                                {item.step}
                              </div>
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/30 transition-all duration-300">
                                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                  <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                                  <span className="font-mono text-[8px] bg-indigo-950 border border-indigo-900/30 text-indigo-400 px-2 py-0.5 rounded uppercase font-bold">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedProject.title === "BillEase" ? (
                        <div className="relative border-l-2 border-blue-500/30 pl-6 ml-4 flex flex-col gap-8 py-2">
                          {[
                            {
                              step: "01",
                              title: "Discovery & Onboarding",
                              desc: "Users arrive on a modern SaaS landing page outlining key billing benefits, transitioning easily to login or client setup.",
                              badge: "Public Access"
                            },
                            {
                              step: "02",
                              title: "Business & Customer Setup",
                              desc: "From the main billing dashboard, owners easily add clients, configure tax parameters, and manage customer records with minimal friction.",
                              badge: "Business Setup"
                            },
                            {
                              step: "03",
                              title: "Smart Invoice Creation",
                              desc: "Using the step-by-step invoice form, owners select customers, input services or products, specify tax fields, and view real-time document preview updates.",
                              badge: "Invoice Generation"
                            },
                            {
                              step: "04",
                              title: "Payment Status Tracking",
                              desc: "Invoices are saved in a clean ledger displaying color-coded payment statuses (Draft, Sent, Paid), backed by notifications for outstanding bills.",
                              badge: "Receivable Ledger"
                            },
                            {
                              step: "05",
                              title: "Business Intelligence Insights",
                              desc: "Interactive reporting dashboards provide a detailed birds-eye analysis of total revenue, outstanding payments, and monthly customer growth trends.",
                              badge: "Business Growth"
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[35px] top-0.5 bg-blue-500 text-slate-950 font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                                {item.step}
                              </div>
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-blue-500/30 transition-all duration-300">
                                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                  <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                                  <span className="font-mono text-[8px] bg-blue-950 border border-blue-900/30 text-blue-400 px-2 py-0.5 rounded uppercase font-bold">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="relative border-l-2 border-violet-500/30 pl-6 ml-4 flex flex-col gap-8 py-2">
                          {[
                            {
                              step: "01",
                              title: "Discovery & Learning Setup",
                              desc: "The onboarding interface assists the student in identifying target exams, dates, and establishing customized daily study schedules to reduce upfront friction.",
                              badge: "Student Onboarding"
                            },
                            {
                              step: "02",
                              title: "Mock Exam Diagnostic Workspace",
                              desc: "Students take targeted practice tests inside a clean, distraction-free examination layout designed specifically to focus attention.",
                              badge: "Exam Experience"
                            },
                            {
                              step: "03",
                              title: "AI Analysis & Weak-Area Target",
                              desc: "The system runs immediate scoring metrics. Insights list precise cognitive gaps, automatically generating a personalized, adaptive learning feed on their Dashboard.",
                              badge: "Data-Driven Processing"
                            },
                            {
                              step: "04",
                              title: "Performance Tracking & Growth",
                              desc: "Students monitor streak indicators, badges, and view a dynamic projection chart predicting their test readiness and score trajectory.",
                              badge: "Motivation Through Growth"
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="relative group">
                              <div className="absolute -left-[35px] top-0.5 bg-violet-500 text-slate-950 font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                                {item.step}
                              </div>
                              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 hover:border-violet-500/30 transition-all duration-300">
                                <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                                  <h5 className="font-bold text-white text-xs sm:text-sm">{item.title}</h5>
                                  <span className="font-mono text-[8px] bg-violet-950 border border-violet-900/30 text-violet-400 px-2 py-0.5 rounded uppercase font-bold">
                                    {item.badge}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: INFORMATION ARCHITECTURE (SITEMAP) */}
                  {activeTab === "sitemap" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">Information Architecture & Sitemap Tree</h4>
                        <p className="text-xs text-slate-400">Structured site hierarchy showing user routing, dashboard indices, and portal controls.</p>
                      </div>

                      {selectedProject.title === "PermitFlow" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              sec: "Public Pages",
                              items: ["Landing Page", "Login Screen", "Register/Verify"],
                              color: "from-blue-500 to-cyan-500"
                            },
                            {
                              sec: "Applicant Portal",
                              items: ["Dashboard Hub", "New Request Form", "Request History", "Status Timeline", "Notifications", "Profile Details"],
                              color: "from-indigo-500 to-blue-500"
                            },
                            {
                              sec: "Admin Portal",
                              items: ["Admin Dashboard", "Review Queue", "Verification Panel", "User Directory", "Reports & Analytics"],
                              color: "from-violet-500 to-indigo-500"
                            },
                            {
                              sec: "System Utility",
                              items: ["Loading Feedbacks", "Zero Empty States", "Error Safeguards", "Submission Success"],
                              color: "from-slate-600 to-slate-800"
                            }
                          ].map((cat, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                              <span className={`text-[10px] font-mono font-bold uppercase py-1 px-2.5 rounded-lg text-slate-950 bg-gradient-to-r ${cat.color} self-start shadow-sm`}>
                                {cat.sec}
                              </span>
                              <div className="flex flex-col gap-1.5 pl-1 font-mono text-[10px] text-slate-400">
                                {cat.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex items-center gap-1.5">
                                    <ChevronRight className="w-3 h-3 text-indigo-400" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedProject.title === "BillEase" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              sec: "Public Screens",
                              items: ["Landing Page", "Product Features", "Login Screen", "Register / Workspace Creation"],
                              color: "from-blue-500 to-cyan-500"
                            },
                            {
                              sec: "Business Portal",
                              items: ["Dashboard Hub", "Invoices Ledger", "Client Directory", "Payments Center", "Live Invoice Creator", "Profile & Workspace Settings"],
                              color: "from-indigo-500 to-blue-500"
                            },
                            {
                              sec: "Accountant Tools",
                              items: ["Customer Directory", "Invoice Records", "Ledger Management", "Financial Reporting", "Analytics Dashboard"],
                              color: "from-violet-500 to-indigo-500"
                            },
                            {
                              sec: "Core Utilities",
                              items: ["PDF Invoice Exporter", "Auto-Tax Calculator", "Late Payment Prompts", "Multi-Workspace Support"],
                              color: "from-slate-600 to-slate-800"
                            }
                          ].map((cat, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                              <span className={`text-[10px] font-mono font-bold uppercase py-1 px-2.5 rounded-lg text-slate-950 bg-gradient-to-r ${cat.color} self-start shadow-sm`}>
                                {cat.sec}
                              </span>
                              <div className="flex flex-col gap-1.5 pl-1 font-mono text-[10px] text-slate-400">
                                {cat.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex items-center gap-1.5">
                                    <ChevronRight className="w-3 h-3 text-blue-400" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            {
                              sec: "Public Screens",
                              items: ["Landing & Features", "Course Directories", "Auth / Registration"],
                              color: "from-violet-500 to-purple-500"
                            },
                            {
                              sec: "Student Portal",
                              items: ["Core Dashboard", "Mock Exam Area", "AI Recommendations", "Personalized Feed", "Leaderboard Index", "Streaks & Achievements"],
                              color: "from-indigo-500 to-violet-500"
                            },
                            {
                              sec: "Admin Portal",
                              items: ["Admin Main", "Question Bank", "Student Cohorts", "Exam Management", "Outcome Metrics"],
                              color: "from-blue-500 to-indigo-500"
                            },
                            {
                              sec: "Utility Templates",
                              items: ["Focused State", "Success Triggers", "Empty Index States", "Loading Overlays"],
                              color: "from-slate-600 to-slate-800"
                            }
                          ].map((cat, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                              <span className={`text-[10px] font-mono font-bold uppercase py-1 px-2.5 rounded-lg text-slate-950 bg-gradient-to-r ${cat.color} self-start shadow-sm`}>
                                {cat.sec}
                              </span>
                              <div className="flex flex-col gap-1.5 pl-1 font-mono text-[10px] text-slate-400">
                                {cat.items.map((item, iIdx) => (
                                  <div key={iIdx} className="flex items-center gap-1.5">
                                    <ChevronRight className="w-3 h-3 text-violet-400" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: LOW-FIDELITY INTERACTIVE CONCEPT MOCKUPS */}
                  {activeTab === "wireframes" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">Interactive Wireframe Concept Simulator</h4>
                        <p className="text-xs text-slate-400">Test the simplified low-fidelity concepts live. Experience how focus states guide user interaction.</p>
                      </div>

                      {selectedProject.title === "PermitFlow" ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col gap-4">
                          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-slate-500">Low-Fi Concept 1</span>
                              <h5 className="font-bold text-white text-xs sm:text-sm">Multi-Step Emergency Request Timeline</h5>
                            </div>
                            <button 
                              onClick={() => setPermitFlowStatus("under_review")}
                              className="font-mono text-[9px] text-indigo-400 hover:text-white flex items-center gap-1 transition"
                            >
                              <RefreshCw className="w-3 h-3" /> Reset
                            </button>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            In high-stress emergency dispatches, clarity is everything. Below is an interactive concept of the **Timeline Tracker**. Click the nodes to simulate state transitions:
                          </p>

                          {/* Active timeline tracker */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-2 font-mono text-[10px]">
                            {[
                              { id: "submitted", label: "1. Request Submitted", badge: "Aakash // User" },
                              { id: "under_review", label: "2. Under Review", badge: "Review In-Progress" },
                              { id: "verified", label: "3. Documents Verified", badge: "Docs OK" },
                              { id: "approved", label: "4. Permission Granted", badge: "Final Dispatch" }
                            ].map((step, idx) => {
                              const states = ["submitted", "under_review", "verified", "approved"];
                              const activeIndex = states.indexOf(permitFlowStatus);
                              const stepIndex = states.indexOf(step.id);
                              
                              const isCompleted = stepIndex < activeIndex;
                              const isActive = step.id === permitFlowStatus;
                              
                              return (
                                <div 
                                  key={step.id}
                                  onClick={() => setPermitFlowStatus(step.id as any)}
                                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-20 ${
                                    isActive 
                                      ? "bg-indigo-600/15 border-indigo-500/80 text-indigo-300 shadow-md ring-1 ring-indigo-500/20" 
                                      : isCompleted
                                      ? "bg-slate-950/80 border-emerald-500/40 text-emerald-400"
                                      : "bg-slate-950/40 border-slate-850 text-slate-500 hover:border-slate-800"
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-bold text-[8px] uppercase tracking-wide">Step {idx + 1}</span>
                                    {isCompleted ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : isActive ? (
                                      <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                                    ) : null}
                                  </div>
                                  <div className="flex flex-col gap-0.5 mt-2">
                                    <span className="font-sans font-bold text-slate-200 text-[10px] truncate">{step.label}</span>
                                    <span className="text-[7px] text-slate-500 truncate">{step.badge}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Detail summary corresponding to selected state */}
                          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-[11px] leading-relaxed text-slate-300 mt-2 font-mono">
                            {permitFlowStatus === "submitted" && (
                              <p className="text-slate-400">
                                <span className="text-white font-bold block mb-1">STATE: SUBMITTED // 12:00 UTC</span>
                                The emergency dispatch request has been structured and securely uploaded. Aakash R's streamlined applicant form has validated all field attributes to prevent database latency.
                              </p>
                            )}
                            {permitFlowStatus === "under_review" && (
                              <p className="text-slate-400">
                                <span className="text-indigo-400 font-bold block mb-1">STATE: Reviewing Case File // IN PROGRESS</span>
                                Centralized queue notifies responders. The system locks fields to prevent applicant tampering while reviewers check geographic coordinates on the live active ingress map.
                              </p>
                            )}
                            {permitFlowStatus === "verified" && (
                              <p className="text-slate-400">
                                <span className="text-indigo-400 font-bold block mb-1">STATE: Credentials & Clearance // VERIFIED</span>
                                Background checks and uploaded emergency authorization blueprints have cleared the automated safety filters. Ready for administrative coordinator final confirmation.
                              </p>
                            )}
                            {permitFlowStatus === "approved" && (
                              <p className="text-emerald-400">
                                <span className="text-emerald-400 font-bold block mb-1">STATE: PERMISSION GRANTED // DISPATCH ACTIVE</span>
                                Permission approved! Digitally signed dispatch coordinates and certificates are issued. Emergency responders can ingress on the system map instantly. Real-time logging complete.
                              </p>
                            )}
                          </div>
                        </div>
                      ) : selectedProject.title === "BillEase" ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col gap-4">
                          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-slate-500">Low-Fi Concept 3</span>
                              <h5 className="font-bold text-white text-xs sm:text-sm">Invoice PDF Layout Blueprint Engine</h5>
                            </div>
                            <button 
                              onClick={() => {
                                setBillEaseLogoPos("left");
                                setBillEaseColor("blue");
                                setBillEaseShowTax(true);
                                setBillEaseExporting(false);
                                setBillEaseExportSuccess(false);
                              }}
                              className="font-mono text-[9px] text-blue-400 hover:text-white flex items-center gap-1 transition"
                            >
                              <RefreshCw className="w-3 h-3" /> Reset Blueprint
                            </button>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            Configure the low-fidelity layout blocks to plan the automatic invoice PDF exporter. Observe how custom spacing and visibility constraints adapt dynamically:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-2">
                            {/* Controls Column */}
                            <div className="md:col-span-5 bg-slate-950 border border-slate-850 p-4 rounded-2xl flex flex-col gap-4">
                              <div>
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-850 pb-2">Layout Constraints</span>
                                
                                {/* Logo Placement Toggle */}
                                <div className="mt-3 flex flex-col gap-1.5">
                                  <label className="text-[9px] font-mono text-slate-400">Logo Alignment Block</label>
                                  <div className="grid grid-cols-3 gap-1">
                                    {(["left", "right", "none"] as const).map((pos) => (
                                      <button
                                        key={pos}
                                        onClick={() => setBillEaseLogoPos(pos)}
                                        className={`py-1 rounded font-mono text-[8px] uppercase border text-center transition ${
                                          billEaseLogoPos === pos 
                                            ? "bg-blue-600/15 border-blue-500 text-blue-400 font-bold" 
                                            : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                                        }`}
                                      >
                                        {pos}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Color Block Palette */}
                                <div className="mt-3.5 flex flex-col gap-1.5">
                                  <label className="text-[9px] font-mono text-slate-400">PDF Color Header Accent</label>
                                  <div className="grid grid-cols-3 gap-1">
                                    {(["blue", "emerald", "slate"] as const).map((col) => (
                                      <button
                                        key={col}
                                        onClick={() => setBillEaseColor(col)}
                                        className={`py-1 rounded font-mono text-[8px] uppercase border text-center transition capitalize ${
                                          billEaseColor === col 
                                            ? col === "blue"
                                              ? "bg-blue-600/15 border-blue-500 text-blue-400 font-bold"
                                              : col === "emerald"
                                              ? "bg-emerald-600/15 border-emerald-500 text-emerald-400 font-bold"
                                              : "bg-slate-700/15 border-slate-500 text-slate-300 font-bold"
                                            : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
                                        }`}
                                      >
                                        {col}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Tax visibility check */}
                                <div className="mt-3.5 flex items-center justify-between bg-slate-900 border border-slate-800/80 p-2.5 rounded-xl">
                                  <div className="flex flex-col">
                                    <span className="text-[9px] font-mono text-white">Line Item Tax Rate</span>
                                    <span className="text-[7px] text-slate-500">Show calculated tax column</span>
                                  </div>
                                  <button
                                    onClick={() => setBillEaseShowTax(!billEaseShowTax)}
                                    className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${
                                      billEaseShowTax ? "bg-blue-500" : "bg-slate-800"
                                    }`}
                                  >
                                    <span className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.25 transition-all duration-300 ${
                                      billEaseShowTax ? "right-0.5" : "left-0.5"
                                    }`} />
                                  </button>
                                </div>

                                {/* Export simulator action button */}
                                <button
                                  disabled={billEaseExporting}
                                  onClick={() => {
                                    setBillEaseExporting(true);
                                    setBillEaseExportSuccess(false);
                                    setTimeout(() => {
                                      setBillEaseExporting(false);
                                      setBillEaseExportSuccess(true);
                                    }, 1000);
                                  }}
                                  className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[9px] uppercase font-bold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition duration-300 disabled:opacity-50"
                                >
                                  {billEaseExporting ? (
                                    <>
                                      <RefreshCw className="w-3 h-3 animate-spin" /> Compiling Blueprint...
                                    </>
                                  ) : "Generate PDF Draft Layout"}
                                </button>
                              </div>
                            </div>

                            {/* Low-Fi Canvas Column */}
                            <div className="md:col-span-7 bg-white text-slate-900 border border-slate-300 p-4 rounded-2xl flex flex-col justify-between h-56 font-mono text-[8px] relative overflow-hidden">
                              {/* Conceptual PDF border headers */}
                              <div className={`h-1.5 absolute top-0 left-0 right-0 ${
                                billEaseColor === "blue" 
                                  ? "bg-blue-500" 
                                  : billEaseColor === "emerald" 
                                  ? "bg-emerald-500" 
                                  : "bg-slate-600"
                              }`} />

                              <div className="flex flex-col gap-2 mt-1">
                                <div className="flex justify-between items-start border-b border-dashed border-slate-300 pb-2">
                                  {billEaseLogoPos === "left" && (
                                    <div className="border border-dashed border-blue-400 bg-blue-50/50 p-1 rounded text-[7px] text-blue-600 font-bold">
                                      [LOGO_BLOCK:LEFT]
                                    </div>
                                  )}
                                  {billEaseLogoPos === "none" && <div />}
                                  <div className="text-right">
                                    <div className="font-bold text-[9px]">[INVOICE_TITLE]</div>
                                    <div className="text-slate-400 text-[6px]">DRAFT_ID: #0042</div>
                                  </div>
                                  {billEaseLogoPos === "right" && (
                                    <div className="border border-dashed border-blue-400 bg-blue-50/50 p-1 rounded text-[7px] text-blue-600 font-bold">
                                      [LOGO_BLOCK:RIGHT]
                                    </div>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[6px] text-slate-500 mt-1">
                                  <div className="border border-dashed border-slate-300 p-1.5 rounded">
                                    <strong>CLIENT_METADATA:</strong>
                                    <div>[CLIENT_NAME]</div>
                                    <div>[CLIENT_EMAIL_VAL]</div>
                                  </div>
                                  <div className="border border-dashed border-slate-300 p-1.5 rounded text-right">
                                    <strong>ISSUER_METADATA:</strong>
                                    <div>[ISSUER_NAME]</div>
                                    <div>[ISSUER_BANK_VAL]</div>
                                  </div>
                                </div>

                                {/* Interactive Item Grid block */}
                                <div className="border border-dashed border-slate-300 p-2 rounded mt-1 flex flex-col gap-1 bg-slate-50">
                                  <div className="flex justify-between items-center font-bold text-[7px] border-b border-slate-200 pb-1">
                                    <span>LINE_ITEM_DESC</span>
                                    <div className="flex gap-4">
                                      {billEaseShowTax && <span className="text-blue-600 font-bold">[TAX]</span>}
                                      <span>[AMOUNT]</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center text-[6px] text-slate-500">
                                    <span>Engineering & Design Consultation Block</span>
                                    <div className="flex gap-4">
                                      {billEaseShowTax && <span className="text-blue-500">10.0%</span>}
                                      <span>$4,200</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t border-dashed border-slate-300 pt-2 flex justify-between items-end">
                                <span className="text-[6px] text-slate-400">
                                  Layout: {billEaseLogoPos} alignment // Color: {billEaseColor} // Tax: {billEaseShowTax ? "On" : "Off"}
                                </span>
                                <div className="text-right">
                                  <div className="text-[6px] text-slate-500">ESTIMATED_TOTAL</div>
                                  <div className={`text-xs font-bold ${
                                    billEaseColor === "blue" 
                                      ? "text-blue-600" 
                                      : billEaseColor === "emerald" 
                                      ? "text-emerald-600" 
                                      : "text-slate-800"
                                  }`}>
                                    ${(4200 + (billEaseShowTax ? 420 : 0)).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Success or log notifications */}
                          <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 text-[11px] leading-relaxed text-slate-300 mt-2 font-mono">
                            {billEaseExporting && (
                              <p className="text-slate-400 animate-pulse">
                                <span className="text-blue-400 font-bold block mb-1">STATE: COMPILING PDF BLUEPRINT // IN PROGRESS</span>
                                Generating layout matrices, embedding type scales (Space Grotesk + Inter), calculating geometric padding vectors...
                              </p>
                            )}
                            {!billEaseExporting && !billEaseExportSuccess && (
                              <p className="text-slate-500">
                                <span className="text-slate-400 font-bold block mb-1">STATE: READY TO EXPORT // LOCAL_BUFFER_CLEARED</span>
                                Setup layout variables using the control board above, then click "Generate PDF Draft Layout" to initiate live mock file generation.
                              </p>
                            )}
                            {billEaseExportSuccess && (
                              <p className="text-emerald-400">
                                <span className="text-emerald-400 font-bold block mb-1">🟢 STATE: PDF GENERATED SUCCESSFULLY // READY</span>
                                Compiled PDF blueprint file successfully. Dimensions matched to standard A4 margins. Layout parameters preserved: logo={billEaseLogoPos}, theme={billEaseColor}, tax={billEaseShowTax ? "active_rate" : "null"}.
                              </p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col gap-4">
                          <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                            <div>
                              <span className="text-[10px] font-mono uppercase text-slate-500">Low-Fi Concept 2</span>
                              <h5 className="font-bold text-white text-xs sm:text-sm">Adaptive Exam Focus Interface</h5>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono text-slate-400">Score: <strong className="text-violet-400">{quizScore} pt</strong></span>
                              <button 
                                onClick={() => {
                                  setSelectedAnswer(null);
                                  setIsAnswerChecked(false);
                                }}
                                className="font-mono text-[9px] text-violet-400 hover:text-white flex items-center gap-1 transition"
                              >
                                <RefreshCw className="w-3 h-3" /> Reset Question
                              </button>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed font-sans">
                            To ensure maximal concentration, CrackChamp strips away screen clutter during exams. Test your cognitive alignment below:
                          </p>

                          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 mt-2 flex flex-col gap-3 font-sans">
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-2">
                              <span>CrackChamp Mock Exam Series 4</span>
                              <span className="flex items-center gap-1 text-amber-500"><Clock className="w-3.5 h-3.5" /> 29:45 remaining</span>
                            </div>

                            <h6 className="text-xs font-bold text-slate-200 leading-relaxed mt-1">
                              Which of the following elements represents the primary driver behind CrackChamp's user experience philosophy?
                            </h6>

                            {/* Multiple choice options */}
                            <div className="flex flex-col gap-2 mt-2">
                              {[
                                { id: "a", label: "A. Complex spreadsheets and maximum statistical metrics to overwhelm the student." },
                                { id: "b", label: "B. Personalized learning paths, AI recommendations, and distraction-free exam grids.", correct: true },
                                { id: "c", label: "C. Hardcoded, non-adaptive mock tests that offer standard static results." },
                                { id: "d", label: "D. Placing advertising banners across the viewport to monetize study streaks." }
                              ].map((option) => {
                                const isSelected = selectedAnswer === option.id;
                                return (
                                  <button
                                    key={option.id}
                                    disabled={isAnswerChecked}
                                    onClick={() => setSelectedAnswer(option.id)}
                                    className={`p-3 text-left rounded-xl text-[11px] transition-all border ${
                                      isAnswerChecked 
                                        ? option.correct
                                          ? "bg-emerald-950/30 border-emerald-500/80 text-emerald-400 font-bold"
                                          : isSelected
                                          ? "bg-rose-950/30 border-rose-500/80 text-rose-400 font-bold"
                                          : "bg-slate-950/20 border-slate-900 text-slate-600"
                                        : isSelected
                                        ? "bg-violet-950/50 border-violet-500/80 text-violet-300"
                                        : "bg-slate-900/60 border-slate-850 hover:border-slate-800 text-slate-300"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Actions and explanation */}
                            {!isAnswerChecked && selectedAnswer && (
                              <button
                                onClick={() => {
                                  setIsAnswerChecked(true);
                                  if (selectedAnswer === "b") {
                                    setQuizScore(s => s + 10);
                                  }
                                }}
                                className="py-2 px-4 bg-violet-600 hover:bg-violet-500 text-slate-950 text-[10px] font-bold font-mono rounded-lg uppercase self-end transition mt-2 shadow-md shadow-violet-500/10"
                              >
                                Check Option Alignment
                              </button>
                            )}

                            {isAnswerChecked && (
                              <div className="mt-2 p-3 bg-slate-900 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-400 leading-relaxed flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                                <div>
                                  {selectedAnswer === "b" ? (
                                    <span className="text-emerald-400 font-bold block mb-1">✓ Correct Option Selected (+10 pt)</span>
                                  ) : (
                                    <span className="text-rose-400 font-bold block mb-1">✗ Incorrect Alignment</span>
                                  )}
                                  Excellent! Choice B represents CrackChamp's goal. It focuses entirely on removing cognitive noise and directing student preparation to target knowledge gaps seamlessly.
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 6: DESIGN PRINCIPLES */}
                  {activeTab === "principles" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-1.5">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-white">UX Design Principles & Realization</h4>
                        <p className="text-xs text-slate-400">Core guidelines directing the layout spacing, components, and interactive realism.</p>
                      </div>

                      {selectedProject.title === "PermitFlow" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Speed & Simplicity",
                              desc: "Enable users to submit emergency permission requests quickly with minimal steps and a distraction-free experience."
                            },
                            {
                              title: "Trust & Transparency",
                              desc: "Provide real-time status updates, approval timelines, and clear communication to build confidence throughout the approval process."
                            },
                            {
                              title: "Premium Government SaaS Experience",
                              desc: "Modern dashboard with clean layouts, soft shadows, rounded components (16px+), professional blue/slate color palette, and generous whitespace."
                            },
                            {
                              title: "Accessibility & Consistency",
                              desc: "Use reusable components, intuitive navigation, WCAG-compliant color contrast, readable typography, and responsive desktop layouts."
                            },
                            {
                              title: "Operational Efficiency",
                              desc: "Present requests, approvals, analytics, and notifications through well-structured dashboards, tables, filters, and visual indicators to help administrators make faster decisions."
                            }
                          ].map((p, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1.5">
                              <h5 className="text-xs font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                {p.title}
                              </h5>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      ) : selectedProject.title === "BillEase" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Financial Clarity & Accessibility",
                              desc: "Ensure all transaction statistics, tax calculations, and status codes are highly legible and readable by users without formal bookkeeping background."
                            },
                            {
                              title: "Rapid Invoice Creation & Execution",
                              desc: "Design clean form wizards and layout shortcuts to help business owners dispatch a client invoice with minimal form steps and cognitive load."
                            },
                            {
                              title: "Actionable Intelligence Reports",
                              desc: "Present monthly receivables, business growth graphs, and billing ledger trends in neat, human-scannable summaries rather than complex raw tables."
                            },
                            {
                              title: "Smart Global Customization",
                              desc: "Provide standard flexible support for multi-currency values, automated regional VAT/tax rates, and customizable PDF branding structures."
                            },
                            {
                              title: "Operational Trust & Status Realism",
                              desc: "Use distinct color-coded statuses (Draft, Sent, Paid) to reflect live tracking conditions and prevent double-billing discrepancies."
                            }
                          ].map((p, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1.5">
                              <h5 className="text-xs font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {p.title}
                              </h5>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              title: "Personalized Learning Experience",
                              desc: "Deliver AI-powered recommendations and adaptive learning paths tailored to each student's performance."
                            },
                            {
                              title: "Focus & Simplicity",
                              desc: "Create distraction-free interfaces that help students stay focused during learning and examinations."
                            },
                            {
                              title: "Motivation Through Progress",
                              desc: "Encourage continuous learning using achievements, learning streaks, progress tracking, badges, and leaderboards."
                            },
                            {
                              title: "Premium EdTech Experience",
                              desc: "Modern, clean interface with spacious layouts, soft shadows, rounded components (16px+), engaging illustrations, and vibrant yet accessible colors."
                            },
                            {
                              title: "Data-Driven UX",
                              desc: "Present learning analytics through intuitive charts, progress indicators, and actionable insights that help students understand where to improve."
                            }
                          ].map((p, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-1.5">
                              <h5 className="text-xs font-bold text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                                {p.title}
                              </h5>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{p.desc}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Built With & Tech Footnotes (Always display in Case Study) */}
                  <div className="mt-8 pt-6 border-t border-slate-850/60 flex flex-col gap-4 font-mono text-[10px]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-slate-500">Case Design Realization: // Aakash R Portfolio Specifications</span>
                      <div className="flex gap-4">
                        {selectedProject.githubUrl && (
                          <a 
                            href={selectedProject.githubUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
                          >
                            <Github className="w-3.5 h-3.5" /> Codebase
                          </a>
                        )}
                        {selectedProject.liveUrl && (
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1.5 font-bold"
                          >
                            <ExternalLink className="w-3.5 h-3.5" /> Interactive Figma Wireframe
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
