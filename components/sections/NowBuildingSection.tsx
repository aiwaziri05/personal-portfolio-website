import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Sparkles, Terminal } from "lucide-react";

export function NowBuildingSection() {
  const { nowBuilding } = PORTFOLIO_DATA;

  const icons = [
    <Terminal key="terminal" className="w-5 h-5 text-[#e8a95c]" />,
    <Sparkles key="sparkles" className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="building" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(04) Now building"
        title="Initiatives of my own."
        subtitle="Mentorship bootcamps, automation workflows, and independent software tooling."
        aside="Community & Products"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {nowBuilding.map((item, idx) => (
          <div
            key={item.title}
            className="p-6 sm:p-7 rounded-xl border border-white/[0.08] bg-[#121216]/60 hover:bg-[#15151b] hover:border-[#e8a95c]/30 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#e8a95c] font-bold px-2 py-0.5 rounded bg-[#e8a95c]/10 border border-[#e8a95c]/25">
                  {item.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-2">
                {icons[idx % icons.length]}
                <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
              </div>

              <span className="block font-mono text-xs text-zinc-500 mb-3">
                {item.category}
              </span>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
