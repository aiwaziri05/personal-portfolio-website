"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Sparkles, Eye, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MottoSection() {
  const [isRevealed, setIsRevealed] = useState(false);
  const { motto } = PORTFOLIO_DATA;

  const toggleReveal = () => setIsRevealed((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleReveal();
    }
  };

  return (
    <section id="motto" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(07) Engineering motto"
        title="Philosophy on craft."
        subtitle="The balance between invisible architectural elegance and pragmatic engineering resilience."
        aside="Approach & Values"
      />

      {/* Accessible Interactive Reveal Card */}
      <div
        role="region"
        aria-label="Interactive philosophy statement"
        onMouseEnter={() => setIsRevealed(true)}
        onMouseLeave={() => setIsRevealed(false)}
        className={`group relative p-8 sm:p-14 rounded-2xl border transition-all duration-500 text-center overflow-hidden cursor-pointer select-none ${
          isRevealed
            ? "border-emerald-500/40 bg-[#12141a]/90 shadow-[0_25px_50px_-12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20"
            : "border-white/[0.08] bg-[#121217]/60 hover:border-[#e8a95c]/35 hover:bg-[#15151c]"
        }`}
      >
        {/* Ambient Top Glow */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
            isRevealed ? "bg-emerald-500/15 opacity-100" : "bg-[#e8a95c]/10 opacity-40"
          }`}
        />

        {/* Top Control Bar: Accessible Mode Switch & Hint */}
        <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
            <Code2 className="w-3.5 h-3.5 text-[#e8a95c]" />
            <span>Developer Axiom</span>
          </div>

          {/* Accessible Segmented Mode Switch */}
          <div
            role="group"
            aria-label="Statement perspective"
            className="inline-flex items-center p-1 rounded-full bg-black/50 border border-white/[0.08] text-xs font-mono"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsRevealed(false);
              }}
              className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                !isRevealed
                  ? "bg-[#e8a95c]/20 text-[#e8a95c] font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-pressed={!isRevealed}
            >
              Theory
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsRevealed(true);
              }}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                isRevealed
                  ? "bg-emerald-500/20 text-emerald-400 font-bold shadow-xs"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-pressed={isRevealed}
            >
              <Sparkles className="w-3 h-3" />
              <span>In Practice</span>
            </button>
          </div>
        </div>

        {/* Keyboard-focusable interactive trigger container */}
        <div
          tabIndex={0}
          role="button"
          aria-expanded={isRevealed}
          aria-label={isRevealed ? "Switch to theory statement" : "Reveal honest practical statement"}
          onClick={toggleReveal}
          onKeyDown={handleKeyDown}
          className="relative z-10 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8a95c] rounded-xl"
        >
          {/* ARIA live region for screen readers */}
          <div className="sr-only" aria-live="polite">
            {isRevealed
              ? `${motto.hidden1} ${motto.hidden2} - Defensive engineering, comprehensive testing, and root-cause fixes.`
              : `${motto.line1} ${motto.line2} ${motto.accent} - Clean architectures stay out of the user's way.`}
          </div>

          {/* Smooth Blur-Slide Transition between Theory and Practice */}
          <div className="min-h-[110px] sm:min-h-[120px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.div
                  key="theory"
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-3"
                >
                  <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {motto.line1} {motto.line2}{" "}
                    <span className="text-[#e8a95c]">{motto.accent}</span>
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-zinc-400 max-w-lg mx-auto">
                    Clean architectures and stable systems stay out of the user&apos;s way.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="practice"
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-3"
                >
                  <p className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100 leading-tight">
                    {motto.hidden1}{" "}
                    <span className="text-emerald-400">{motto.hidden2}</span>
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-emerald-400/90 max-w-lg mx-auto">
                    Defensive engineering, automated testing, and fixing issues at the source.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Accessible helper hint */}
          <div className="mt-6 flex items-center justify-center gap-1.5 font-mono text-[11px] text-zinc-500">
            <Eye className="w-3.5 h-3.5" />
            <span>
              {isRevealed
                ? "Click or press Space to see theory"
                : "Hover, tap, or press Space to reveal reality"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
