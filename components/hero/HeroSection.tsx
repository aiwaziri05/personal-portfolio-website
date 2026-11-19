"use client";

import { useState } from "react";
import { ArrowDown, FileText } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/Icons";
import { CopyEmailButton } from "../ui/CopyEmailButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { BriefModal } from "../ui/BriefModal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { motion } from "framer-motion";

export function HeroSection() {
  const [briefOpen, setBriefOpen] = useState(false);
  const { personal, hero, contact } = PORTFOLIO_DATA;

  return (
    <section id="home" className="pt-12 sm:pt-20 pb-20 border-b border-white/[0.08]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 20 }}
        className="max-w-3xl lg:max-w-4xl"
      >
        {/* Editorial Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e8a95c]/25 bg-[#e8a95c]/10 mb-6">
          <span className="font-mono text-xs text-[#e8a95c] font-semibold tracking-wide">
            {hero.kicker}
          </span>
        </div>

        {/* Main Title - Impactful Editorial Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-100 leading-[1.08] mb-6">
          <span>{hero.titleLine1}</span>
          <br />
          <span className="text-[#e8a95c] hover:text-[#f3c285] transition-colors">
            {hero.titleLine2}
          </span>
        </h1>

        {/* Sub-lead */}
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed mb-8 max-w-2xl font-normal">
          {hero.lead}
        </p>

        {/* Action Buttons: WhatsApp + Explore Work + Copy Email + Brief */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
          <WhatsAppButton
            phoneRaw={personal.phoneRaw}
            variant="solid"
            message="Hi Abdullahi, I saw your portfolio and would like to discuss a project."
          >
            Chat on WhatsApp
          </WhatsAppButton>

          <a
            href="#work"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.12] bg-[#16161c] hover:bg-[#1e1e26] text-zinc-200 hover:text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95"
          >
            <span>Explore Work (03)</span>
            <ArrowDown className="w-4 h-4 text-[#e8a95c] stroke-[2.5]" />
          </a>

          <CopyEmailButton email={personal.email} variant="outline" />

          <button
            type="button"
            onClick={() => setBriefOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-white/[0.08] bg-zinc-900/40 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-zinc-400" />
            <span>Project Brief</span>
          </button>
        </div>

        {/* Social / Verified Links Strip */}
        <div className="flex items-center gap-5 text-xs font-mono text-zinc-500">
          <span>Connect:</span>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span>/</span>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span>/</span>
          <span className="text-zinc-400">{personal.location}</span>
        </div>
      </motion.div>

      {/* Brief Modal */}
      <BriefModal
        isOpen={briefOpen}
        onClose={() => setBriefOpen(false)}
        email={personal.email}
        template={contact.briefTemplate}
      />
    </section>
  );
}
