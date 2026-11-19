import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CheckCircle2 } from "lucide-react";

export function ServicesSection() {
  const { services } = PORTFOLIO_DATA;

  return (
    <section id="services" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(02) What I do"
        title="From the first mock-up to the last API call."
        subtitle="Specialized engineering capabilities tailored to eliminate operational bottlenecks and drive growth for modern businesses."
        aside="Full-Stack Capabilities"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.number}
            className="group p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#121216]/60 hover:bg-[#16161c] hover:border-[#e8a95c]/35 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header with Number and Subtitle */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-[#e8a95c] font-bold px-2 py-0.5 rounded bg-[#e8a95c]/10 border border-[#e8a95c]/25">
                  {service.number}
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  {service.subtitle}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-zinc-100 group-hover:text-white transition-colors mb-3">
                {service.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-2 mb-6">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-[#e8a95c] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Badges */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-white/[0.05]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
