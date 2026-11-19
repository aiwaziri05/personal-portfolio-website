"use client";

import { useState } from "react";
import { Project } from "@/data/portfolioData";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { GitHubIcon } from "./Icons";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-xl border border-white/[0.08] bg-[#121216]/70 hover:bg-[#15151a] hover:border-white/[0.14] transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        {/* Top bar: Category + Role & Year */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/[0.06] mb-5">
          <span className="font-mono text-xs text-sky-400 font-semibold uppercase tracking-wider">
            {project.category}
          </span>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>
        </div>

        {/* Title & Summary */}
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
          {project.summary}
        </p>

        {/* Metrics Bar */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6 p-3 rounded-lg bg-black/40 border border-white/[0.05]">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <span className="block font-mono text-sm sm:text-base font-bold text-emerald-400">
                  {m.value}
                </span>
                <span className="block text-[10px] sm:text-[11px] text-zinc-500 font-mono mt-0.5 truncate">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable Architecture Breakdown (C.P.R.++) */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1">
              The Challenge
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-1">
              Engineering Solution
            </h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {expanded && (
            <div className="pt-2 animate-in fade-in duration-200">
              <h4 className="text-xs font-mono uppercase text-emerald-400 tracking-wider mb-1">
                Business & Operational Outcome
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                {project.outcome}
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Toggle details button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 mb-6 cursor-pointer"
        >
          <span>{expanded ? "Show less" : "Read full outcome"}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Bottom bar: Tech tags + Links */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white transition-colors border border-white/[0.08]"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3 stroke-[2.5]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
