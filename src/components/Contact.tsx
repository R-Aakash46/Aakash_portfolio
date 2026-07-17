import React, { useState } from "react";
import { PortfolioData } from "../types";
import { Mail, Github, Linkedin, MessageSquare, Send, Check, Loader2, AlertCircle, Figma, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  portfolioData: PortfolioData;
  activeThemeText: string;
  activeThemeAccent: string;
}

export default function Contact({ portfolioData, activeThemeText, activeThemeAccent }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      // Clear success notification after a delay
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to deliver message to the server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-slate-900 bg-slate-950/20 relative overflow-hidden">
      {/* Immersive glow background */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-2 mb-16">
          <span className={`font-mono text-xs font-semibold uppercase tracking-[0.3em] ${activeThemeText}`}>
            05 / Direct Channel
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans uppercase">
            Start a Collaboration
          </h2>
          <div className={`w-12 h-1 bg-gradient-to-r ${activeThemeAccent} mt-2`}></div>
          <p className="text-xs text-slate-400 max-w-xl mt-3 leading-relaxed">
            Interested in consulting, full-time contracts, or technical inquiries? Deliver an encrypted message below and check the Studio Inbox tab at the top of the screen to watch it deliver in real time!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mt-6">
          
          {/* Left Column: Info & Socials */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Direct Contacts</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded bg-slate-900 border border-slate-800 ${activeThemeText} shrink-0`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="text-slate-500 font-medium">Inquiries & Correspondence</span>
                  <a href={`mailto:${portfolioData.email}`} className="text-slate-200 hover:text-white transition font-mono">
                    {portfolioData.email || "vimalakumar202@gmail.com"}
                  </a>
                </div>
              </div>

              {portfolioData.github && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-slate-500 font-medium">Open Source Portfolio</span>
                    <a href={`https://${portfolioData.github}`} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white transition font-mono">
                      {portfolioData.github}
                    </a>
                  </div>
                </div>
              )}

              {portfolioData.linkedin && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-slate-500 font-medium">LinkedIn Network</span>
                    <a href={`https://${portfolioData.linkedin}`} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white transition font-mono">
                      {portfolioData.linkedin}
                    </a>
                  </div>
                </div>
              )}

              {portfolioData.figma && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    <Figma className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-slate-500 font-medium">Figma Profile</span>
                    <a href={`https://${portfolioData.figma}`} target="_blank" rel="noreferrer" className="text-slate-200 hover:text-white transition font-mono">
                      {portfolioData.figma}
                    </a>
                  </div>
                </div>
              )}

              {portfolioData.phone && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="text-slate-500 font-medium">Direct Telephone</span>
                    <a href={`tel:${portfolioData.phone}`} className="text-slate-200 hover:text-white transition font-mono">
                      {portfolioData.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850/80 text-xs text-slate-400 mt-6 leading-relaxed">
              <span className="font-bold text-slate-300 block mb-1">Preview Notice:</span>
              Our portfolio's inbox is interactive! Submitting the form on the right fires a live POST to our backend, storing your submission instantly in memory to verify contact routing workflows.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 bg-slate-900/25 border border-slate-850 rounded-2xl flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full bg-slate-950/60 text-slate-200 text-xs p-3 rounded-lg border border-slate-800/85 focus:border-cyan-400/50 outline-none transition placeholder-slate-650"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@company.com"
                    className="w-full bg-slate-950/60 text-slate-200 text-xs p-3 rounded-lg border border-slate-800/85 focus:border-cyan-400/50 outline-none transition placeholder-slate-650"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry Topic / Project details"
                  className="w-full bg-slate-950/60 text-slate-200 text-xs p-3 rounded-lg border border-slate-800/85 focus:border-cyan-400/50 outline-none transition placeholder-slate-650"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-slate-400 uppercase font-bold">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Enter message details..."
                  className="w-full h-32 bg-slate-950/60 text-slate-200 text-xs p-3 rounded-lg border border-slate-800/85 focus:border-cyan-400/50 outline-none transition placeholder-slate-650 resize-none"
                />
              </div>

              {/* Status alerts */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-950/20 border border-red-900/50 p-2.5 rounded-lg text-xs text-red-400 flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="bg-emerald-950/20 border border-emerald-900/50 p-2.5 rounded-lg text-xs text-emerald-400 flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Message delivered to portfolio's server inbox! Check the Inbox tab above.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className={`py-3 px-5 bg-gradient-to-r ${activeThemeAccent} text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:opacity-95 transition cursor-pointer disabled:opacity-50 mt-2`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Transmitting Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Transmit Message Securely
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
