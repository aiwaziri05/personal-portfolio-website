"use client";

import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { CopyEmailButton } from "../ui/CopyEmailButton";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { BriefModal } from "../ui/BriefModal";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "../ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Mail, Phone, FileText, ArrowUp } from "lucide-react";

export function ContactSection() {
  const [briefOpen, setBriefOpen] = useState(false);
  const { contact, personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="pt-20 pb-16">
      <SectionHeading
        chapter="(08) Contact & Engagement"
        title={contact.heading}
        subtitle={contact.subheading}
        aside="Available for Q2/Q3 Projects"
      />

      {/* 3-Step Engagement Process (Inacio Inspired) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contact.steps.map((s) => (
          <div
            key={s.step}
            className="p-6 rounded-xl border border-white/[0.08] bg-[#121216]/60 hover:bg-[#15151a] hover:border-[#e8a95c]/30 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-[#e8a95c] font-bold px-2 py-0.5 rounded bg-[#e8a95c]/10 border border-[#e8a95c]/25 mb-3 inline-block">
                Step {s.step}
              </span>
              <h3 className="text-base font-bold text-zinc-100 mb-2">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {s.detail}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Outreach Conversion Card */}
      <div className="p-8 sm:p-12 rounded-2xl border border-white/[0.12] bg-[#121217]/90 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden mb-20 ring-1 ring-[#e8a95c]/20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{personal.availability}</span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight mb-4">
          Have an upcoming project or bottleneck?
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
          Reach out directly with your requirements. I respond within 24 hours with architectural thoughts and a clear milestone quote in Nigerian Naira (₦) or USD.
        </p>

        {/* Action Controls: WhatsApp + Email + Brief */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8">
          {/* Direct WhatsApp Call to Action */}
          <WhatsAppButton
            phoneRaw={personal.phoneRaw}
            variant="solid"
            message="Hi Abdullahi, I would like to inquire about a project."
          >
            Chat on WhatsApp
          </WhatsAppButton>

          <CopyEmailButton email={personal.email} variant="solid" />

          <a
            href={`mailto:${personal.email}?subject=Project%20Inquiry`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.12] bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
          >
            <Mail className="w-4 h-4 text-[#e8a95c]" />
            <span>Open Email</span>
          </a>

          <button
            type="button"
            onClick={() => setBriefOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.12] bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-zinc-400" />
            <span>Project Brief</span>
          </button>
        </div>

        {/* Additional Contact Methods */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-400">
          <a
            href={`tel:${personal.phoneRaw}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#e8a95c]" />
            <span>{personal.phone}</span>
          </a>
          <span>·</span>
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>WhatsApp Direct</span>
          </a>
          <span>·</span>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span>·</span>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <LinkedInIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Footer Meta Strip */}
      <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div>
          <span>© 2026 {personal.name}. Built with Next.js & Tailwind.</span>
        </div>

        <div className="flex items-center gap-4">
          <span>{personal.location} · WAT (UTC+1)</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3 text-[#e8a95c]" />
          </button>
        </div>
      </div>

      <BriefModal
        isOpen={briefOpen}
        onClose={() => setBriefOpen(false)}
        email={personal.email}
        template={contact.briefTemplate}
      />
    </section>
  );
}
