import React, { useState, useEffect } from "react";
import { PortfolioData } from "../types";
import { 
  Sparkles, 
  RotateCcw, 
  Palette, 
  MessageSquare, 
  Code, 
  ArrowRight, 
  Check, 
  Loader2, 
  AlertCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ThemeCustomizerProps {
  portfolioData: PortfolioData;
  setPortfolioData: (data: PortfolioData) => void;
  resetToDefault: () => void;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
}

const colorThemes = [
  { id: "slate", name: "Midnight Slate", primary: "bg-slate-900", accent: "from-cyan-400 to-blue-500", text: "text-cyan-400" },
  { id: "emerald", name: "Emerald Forest", primary: "bg-zinc-950", accent: "from-emerald-400 to-teal-500", text: "text-emerald-400" },
  { id: "royal", name: "Royal Indigo", primary: "bg-slate-950", accent: "from-indigo-400 to-purple-500", text: "text-indigo-400" },
  { id: "amber", name: "Amber Cyber", primary: "bg-neutral-950", accent: "from-amber-400 to-orange-500", text: "text-amber-400" }
];

const sampleResumes = {
  mlEngineer: `Jane Doe
Lead Machine Learning Engineer
janesecurity@gmail.com | github.com/janeml | linkedin.com/in/janeml
San Francisco, CA

BIO: Designing and implementing high-throughput computer vision models and neural network pipelines.

EXPERIENCE:
Staff ML Engineer at NeuralCore (2022 - Present)
- Architected a distributed video analytics system utilizing PyTorch and Docker, scaling inference to 50k frames per second.
- Fine-tuned transformer models for domain-specific NLP parsing, elevating search indexing accuracy by 40%.
- Lead team of 5 research engineers on multi-modal generative imagery research.

Computer Vision Developer at VisionTech (2019 - 2022)
- Implemented real-time object detection models for autonomous drones using OpenCV and C++.
- Deployed lightweight mobile neural networks on edge processors, reducing battery drain by 30%.

PROJECTS:
OmniDetect SDK: Core object segmentation and tracking SDK processing video feeds on edge hardware.
- Tags: Python, PyTorch, C++, CUDA
- Deployed on over 10,000 industrial hardware components.

GeoEmbedder: Geospatial image embedding catalog generating semantic terrain grids.
- Tags: Python, TensorFlow, GCP, Kubernetes

EDUCATION:
Master of Science in Artificial Intelligence, Stanford University (2017 - 2019)`,

  designer: `Alex Chen
Senior Creative Developer & UI Architect
alexdesign@gmail.com | github.com/alexcreative | linkedin.com/in/alexdesign
New York, NY

BIO: Forging high-fidelity digital products by intersecting visual aesthetics with raw creative code.

EXPERIENCE:
Design Systems Architect at PixelPerfect (2021 - Present)
- Engineered a web-accessible UI library supporting 25+ product groups, saving 4,000 engineering hours quarterly.
- Authored custom GPU-accelerated canvas components using WebGL and Three.js for interactive landing pages.
- Established rigorous design guidelines and motion token matrices.

Interaction Developer at CanvasHQ (2019 - 2021)
- Crafted responsive creative web campaigns featuring rich scroll-driven animations and SVG illustrations.
- Redesigned the primary user onboarding pipeline, driving a 28% increase in conversions.

PROJECTS:
FluidCanvas WebGL: A modular fluid-simulation canvas background library for interactive websites.
- Tags: WebGL, TypeScript, Three.js, motion
- Garnered 3,000+ stars on GitHub.

VibeToken CSS: CSS animation token framework centered on micro-interactions.
- Tags: Tailwind, SCSS, React, Figma

EDUCATION:
Bachelor of Fine Arts in Interaction Design, Cooper Union (2015 - 2019)`
};

export default function ThemeCustomizer({
  portfolioData,
  setPortfolioData,
  resetToDefault,
  activeTheme,
  setActiveTheme
}: ThemeCustomizerProps) {
  const [resumeText, setResumeText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);
  const [activeTab, setActiveTab] = useState<"resume" | "theme" | "messages">("resume");

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Failed to fetch messages", e);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleParseResume = async (textToParse: string) => {
    if (!textToParse.trim()) {
      setError("Please paste some resume text or choose a sample to parse.");
      return;
    }

    setParsing(true);
    setError(null);
    setSuccessMsg(false);

    try {
      const response = await fetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: textToParse }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred while parsing.");
      }

      setPortfolioData(data);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to parse resume text. Verify your API Key configuration.");
    } finally {
      setParsing(false);
    }
  };

  const loadSample = (key: keyof typeof sampleResumes) => {
    const text = sampleResumes[key];
    setResumeText(text);
    handleParseResume(text);
  };

  return (
    <div id="theme-customizer-panel" className="bg-slate-900/45 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 bg-slate-950/40">
        <button
          onClick={() => setActiveTab("resume")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === "resume" 
              ? "border-cyan-400 text-cyan-400 bg-slate-900/30" 
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          AI Importer
        </button>
        <button
          onClick={() => setActiveTab("theme")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === "theme" 
              ? "border-cyan-400 text-cyan-400 bg-slate-900/30" 
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Palette className="w-4 h-4" />
          Themes
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border-b-2 transition-all relative ${
            activeTab === "messages" 
              ? "border-cyan-400 text-cyan-400 bg-slate-900/30" 
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Inbox
          {messages.length > 0 && (
            <span className="absolute top-2.5 right-4 bg-cyan-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {messages.length}
            </span>
          )}
        </button>
      </div>

      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
        {/* TAB 1: AI RESUME IMPORTER */}
        {activeTab === "resume" && (
          <div className="flex-1 flex flex-col gap-4 justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                Import Professional Resume
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Paste any raw resume text below. Our server-side Gemini AI model will instantly parse it, generate a tailored portfolio layout, and style your skills and experiences automatically.
              </p>

              {/* Sample Presets */}
              <div className="mt-3">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-2">Or test with demo candidates:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => loadSample("mlEngineer")}
                    disabled={parsing}
                    className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 hover:border-slate-600 transition flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <Code className="w-3.5 h-3.5" />
                    Jane (ML Eng)
                  </button>
                  <button
                    onClick={() => loadSample("designer")}
                    disabled={parsing}
                    className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 hover:border-slate-600 transition flex items-center justify-center gap-1 disabled:opacity-50"
                  >
                    <Palette className="w-3.5 h-3.5" />
                    Alex (UI Designer)
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="mt-4 relative">
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste LinkedIn info, bio paragraphs, or raw resume text here..."
                  className="w-full h-44 bg-slate-950/70 text-slate-200 text-xs p-3 rounded-lg border border-slate-800 focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 outline-none resize-none placeholder-slate-600 font-mono transition"
                />
              </div>

              {/* Status and Errors */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 bg-red-950/30 border border-red-900/50 p-2.5 rounded text-xs text-red-400 flex items-start gap-2 leading-relaxed"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {successMsg && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 bg-emerald-950/30 border border-emerald-900/50 p-2.5 rounded text-xs text-emerald-400 flex items-start gap-2 leading-relaxed"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>AI parsing complete! The entire portfolio has been updated with {portfolioData.name}'s details.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex gap-3">
                <button
                  onClick={resetToDefault}
                  disabled={parsing}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 border border-slate-700 hover:border-slate-600 transition disabled:opacity-50"
                  title="Reset to default Aakash R data"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleParseResume(resumeText)}
                  disabled={parsing}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-cyan-400/10 disabled:opacity-50"
                >
                  {parsing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Parsing with Gemini AI...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Parse & Render Portfolio
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THEME PALETTES */}
        {activeTab === "theme" && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-cyan-400" />
                Aesthetic Color Palettes
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Transform the mood of the portfolio. Select a curated theme designed to match specific developer identities.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              {colorThemes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setActiveTheme(theme.id)}
                  className={`p-3 rounded-lg border text-left transition relative overflow-hidden ${
                    activeTheme === theme.id 
                      ? "border-cyan-400 bg-slate-800/40" 
                      : "border-slate-800 bg-slate-950/30 hover:bg-slate-900/30 hover:border-slate-700"
                  }`}
                >
                  <div className="flex flex-col gap-1.5 relative z-10">
                    <span className="text-xs font-medium text-slate-200">{theme.name}</span>
                    <div className="flex gap-1.5 items-center">
                      <div className={`w-3 h-3 rounded-full ${theme.primary} border border-slate-700`} />
                      <div className={`w-6 h-3 rounded bg-gradient-to-r ${theme.accent}`} />
                    </div>
                  </div>
                  {activeTheme === theme.id && (
                    <div className="absolute top-1.5 right-1.5 bg-cyan-400 text-slate-950 rounded-full p-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="p-3.5 bg-slate-950/40 border border-slate-800/70 rounded-xl mt-2">
              <span className="text-xs font-semibold text-slate-300 block mb-1">Visual Architecture:</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Styled purely with custom Inter typography, adaptive flex containers, fluid sizing, and elegant micro-interactions built on tailwind and framer motion.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT FORM INBOX */}
        {activeTab === "messages" && (
          <div className="flex-1 flex flex-col h-full gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Inbound Inquiries Log
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Test the contact form at the bottom of the portfolio! New inquiries will immediately stream into this secure server-side dashboard.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[310px] custom-scrollbar flex flex-col gap-2.5 mt-2">
              <AnimatePresence initial={false}>
                {messages.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-36 border border-dashed border-slate-800 rounded-lg flex flex-col items-center justify-center text-center p-4 text-slate-500"
                  >
                    <MessageSquare className="w-6 h-6 mb-2 stroke-[1.5]" />
                    <span className="text-xs">No messages received yet.</span>
                    <span className="text-[10px] text-slate-600 mt-1">Submit the contact form below to test!</span>
                  </motion.div>
                ) : (
                  messages.map((msg, index) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-lg flex flex-col gap-1.5 text-xs hover:border-slate-700/80 transition"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-slate-200 truncate">{msg.name}</span>
                        <span className="text-[10px] text-slate-500 shrink-0">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex flex-col text-[11px] text-slate-400 leading-tight">
                        <span className="truncate text-cyan-400/90 font-medium">{msg.email}</span>
                        <span className="font-semibold text-slate-300 mt-1 italic">Re: {msg.subject}</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-2 rounded border border-slate-850 font-sans mt-1 text-[11px]">
                        {msg.message}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
