import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ShieldCheck, Cpu, Clock, Layers } from "lucide-react";

export function AboutSection() {
  const { about, stats } = PORTFOLIO_DATA;

  const statIcons = [
    <Layers key="layers" className="w-4 h-4 text-[#e8a95c]" />,
    <ShieldCheck key="shield" className="w-4 h-4 text-emerald-400" />,
    <Clock key="clock" className="w-4 h-4 text-[#e8a95c]" />,
    <Cpu key="cpu" className="w-4 h-4 text-sky-400" />,
  ];

  return (
    <section id="about" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(01) About me"
        title="Engineering what matters."
        aside="Kano, Nigeria · Working Worldwide"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 space-y-6 text-zinc-300 text-base sm:text-lg leading-relaxed">
          <p className="text-zinc-100 font-medium text-lg sm:text-xl leading-relaxed">
            {about.statement}
          </p>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            I work with startups, growing businesses, and modern product teams. Whether it&apos;s refactoring an unwieldy legacy PHP system into a clean MVC structure, implementing high-converting checkout flows with Paystack, or engineering a high-speed React/Next.js interface, my focus is always on reliability, speed, and real business outcomes.
          </p>
          <p className="text-xs font-mono text-[#e8a95c]">
            {about.note}
          </p>
        </div>

        {/* Right Column: 4-Stat Proof Grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl border border-white/[0.08] bg-[#121216]/60 hover:bg-[#18181f] hover:border-[#e8a95c]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#e8a95c] tracking-tight">
                  {stat.value}
                </span>
                {statIcons[index % statIcons.length]}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-zinc-200">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-zinc-500 mt-1 font-mono">
                  {stat.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
