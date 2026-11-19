import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const { testimonials } = PORTFOLIO_DATA;

  return (
    <section id="testimonials" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(06) What they said"
        title="Direct words from collaborators."
        subtitle="Feedback on execution, problem-solving, and communication."
        aside="Colleagues & Clients"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-[#121216]/60 flex flex-col justify-between"
          >
            <div>
              <Quote className="w-6 h-6 text-sky-400 mb-4 opacity-75" />
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06]">
              <h4 className="text-sm font-semibold text-zinc-100">{t.author}</h4>
              <p className="text-xs font-mono text-zinc-500 mt-0.5">
                {t.role} · {t.organization}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

