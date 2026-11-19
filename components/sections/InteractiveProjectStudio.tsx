"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { ExternalLink, ChevronRight, Layers, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { GitHubIcon, WhatsAppIcon } from "../ui/Icons";
import { motion, AnimatePresence } from "framer-motion";

export function InteractiveProjectStudio() {
  const { projects, personal } = PORTFOLIO_DATA;
  const [activeId, setActiveId] = useState<string>(projects[0]?.id || "spidergate");
  const [activeTab, setActiveTab] = useState<"challenge" | "solution" | "outcome">("solution");

  const activeProject = projects.find((p) => p.id === activeId) || projects[0];

  const whatsappInquiryUrl = `https://wa.me/${personal.phoneRaw}?text=${encodeURIComponent(
    `Hi Abdullahi, I saw the "${activeProject.title}" project on your portfolio and would like to discuss building something similar.`
  )}`;

  return (
    <section id="work" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(03) Selected work"
        title="Work I've had a hand in."
        subtitle="Explore production platforms, enterprise tools, and payment systems through an interactive project studio."
        aside="Interactive Studio · 04 Projects"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Project Selector List */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-wider px-1 mb-1">
            Select a project to inspect:
          </span>

          {projects.map((project) => {
            const isSelected = project.id === activeId;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  setActiveId(project.id);
                  setActiveTab("solution");
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? "bg-[#18181f] border-[#e8a95c]/60 shadow-lg shadow-black/50"
                    : "bg-[#121216]/60 border-white/[0.07] hover:bg-[#16161b] hover:border-white/[0.14]"
                }`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-[#e8a95c]/20 text-[#e8a95c] border border-[#e8a95c]/30"
                        : "bg-zinc-800 text-zinc-400 border border-white/[0.05]"
                    }`}
                  >
                    {project.number}
                  </span>

                  <div className="min-w-0">
                    <h3
                      className={`text-sm sm:text-base font-bold truncate transition-colors ${
                        isSelected ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono truncate mt-0.5">
                      {project.category}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? "text-[#e8a95c] translate-x-0.5" : "text-zinc-600"
                  }`}
                />
              </button>
            );
          })}

          {/* Quick GitHub Repos Callout */}
          <div className="mt-3 p-3.5 rounded-xl border border-white/[0.06] bg-black/30 flex items-center justify-between gap-2 text-xs font-mono text-zinc-400">
            <span>More repos on GitHub:</span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#e8a95c] hover:underline"
            >
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>/aiwaziri05</span>
            </a>
          </div>
        </div>

        {/* Right Column: Active Project Detail Stage */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-2xl border border-white/[0.1] bg-[#121217] p-6 sm:p-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle amber accent beam on top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e8a95c] to-transparent opacity-80" />

              {/* Stage Top Bar: Category + Meta + Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.08] mb-6">
                <div>
                  <span className="font-mono text-xs text-[#e8a95c] font-semibold uppercase tracking-wider block">
                    {activeProject.category}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mt-0.5">
                    <span>{activeProject.role}</span>
                    <span>·</span>
                    <span>{activeProject.year}</span>
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 flex-wrap">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-zinc-100 hover:text-white transition-colors border border-white/[0.1]"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400" />
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors border border-white/[0.06]"
                    >
                      <GitHubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Summary */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">
                {activeProject.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                {activeProject.summary}
              </p>

              {/* 3 Metric Proof Highlights */}
              {activeProject.metrics && (
                <div className="grid grid-cols-3 gap-2.5 mb-6 p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <span className="block font-mono text-base sm:text-lg font-extrabold text-[#e8a95c]">
                        {m.value}
                      </span>
                      <span className="block text-[11px] text-zinc-400 font-mono mt-0.5 truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* CPR Interactive Tabs (Challenge / Solution / Outcome) */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveTab("solution")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      activeTab === "solution"
                        ? "bg-[#e8a95c]/15 text-[#e8a95c] font-bold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Engineering Solution
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("challenge")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      activeTab === "challenge"
                        ? "bg-[#e8a95c]/15 text-[#e8a95c] font-bold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    The Challenge
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("outcome")}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      activeTab === "outcome"
                        ? "bg-[#e8a95c]/15 text-[#e8a95c] font-bold"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Business Outcome (ROI)
                  </button>
                </div>

                <div className="pt-3 min-h-[90px]">
                  {activeTab === "solution" && (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed animate-in fade-in duration-150">
                      {activeProject.solution}
                    </p>
                  )}
                  {activeTab === "challenge" && (
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed animate-in fade-in duration-150">
                      {activeProject.challenge}
                    </p>
                  )}
                  {activeTab === "outcome" && (
                    <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-150">
                      <span className="font-semibold block mb-1">Measurable Result:</span>
                      {activeProject.outcome}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Row: Tech Tags + Direct WhatsApp Deep Link */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.08] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Discuss similar system on WhatsApp</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

