import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { GitHubIcon } from "../ui/Icons";
import { ArrowUpRight } from "lucide-react";

export function SelectedWorkSection() {
  const { projects, personal } = PORTFOLIO_DATA;

  return (
    <section id="work" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(03) Selected work"
        title="Work I've had a hand in."
        subtitle="Production platforms, internal operational tools, and enterprise systems built from database architecture to user interface."
        aside="Production & Freelance"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* GitHub Callout Footer */}
      <div className="mt-12 p-6 rounded-xl border border-white/[0.08] bg-[#121216]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-zinc-200">
            Looking for more repositories & prototypes?
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Explore ongoing open-source experiments, scripts, and utilities on GitHub.
          </p>
        </div>

        <a
          href={personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold transition-colors border border-white/[0.1] shrink-0"
        >
          <GitHubIcon className="w-3.5 h-3.5" />
          <span>github.com/aiwaziri05</span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400" />
        </a>
      </div>
    </section>
  );
}
