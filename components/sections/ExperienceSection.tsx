"use client";

import { SectionHeading } from "../ui/SectionHeading";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Briefcase, Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  ReactLogo,
  NextjsLogo,
  TypeScriptLogo,
  TailwindLogo,
  InertiaLogo,
  HtmlCssLogo,
  LaravelLogo,
  PhpLogo,
  MySqlLogo,
  PostgresLogo,
  FirebaseLogo,
  PaystackLogo,
  OsmLogo,
  SecurityLogo,
  WebhookLogo,
  GeminiLogo,
  GitLogo,
  GhActionsLogo,
  ServerLogo,
  ViteLogo,
  FigmaLogo,
} from "../ui/TechLogos";

interface ToolItem {
  name: string;
  role: string;
  Logo: React.ComponentType<{ className?: string }>;
}

interface ToolkitCard {
  number: string;
  category: string;
  subtitle: string;
  color: string;
  tools: ToolItem[];
}

const threeToolkitCards: ToolkitCard[] = [
  {
    number: "01",
    category: "Frontend & Interface",
    subtitle: "Reactive UIs, App Router & design systems",
    color: "#e8a95c",
    tools: [
      { name: "React 19", role: "UI Library", Logo: ReactLogo },
      { name: "Next.js", role: "App Router", Logo: NextjsLogo },
      { name: "TypeScript", role: "Type Safety", Logo: TypeScriptLogo },
      { name: "Tailwind CSS", role: "Design Tokens", Logo: TailwindLogo },
      { name: "Inertia.js", role: "SPA Flow", Logo: InertiaLogo },
      { name: "HTML5 / CSS3", role: "Semantic Markup", Logo: HtmlCssLogo },
    ],
  },
  {
    number: "02",
    category: "Backend & Databases",
    subtitle: "MVC frameworks, relational DBs & APIs",
    color: "#10b981",
    tools: [
      { name: "Laravel", role: "Full-Stack MVC", Logo: LaravelLogo },
      { name: "PHP", role: "Server Logic", Logo: PhpLogo },
      { name: "MySQL", role: "Relational DB", Logo: MySqlLogo },
      { name: "PostgreSQL", role: "ACID Database", Logo: PostgresLogo },
      { name: "Firebase", role: "Auth & Firestore", Logo: FirebaseLogo },
      { name: "RESTful APIs", role: "Endpoints", Logo: WebhookLogo },
    ],
  },
  {
    number: "03",
    category: "Integrations & DevOps",
    subtitle: "Payments, automated CI/CD & deployment",
    color: "#38bdf8",
    tools: [
      { name: "Paystack", role: "Checkout Gateway", Logo: PaystackLogo },
      { name: "OpenStreetMap", role: "Geofencing", Logo: OsmLogo },
      { name: "SHA-256", role: "Crypto Sealing", Logo: SecurityLogo },
      { name: "GitHub Actions", role: "CI/CD Pipeline", Logo: GhActionsLogo },
      { name: "Git & GitHub", role: "Version Control", Logo: GitLogo },
      { name: "SSH & cPanel", role: "Deploy & Linux", Logo: ServerLogo },
      { name: "Vite & Figma", role: "Build & Design", Logo: ViteLogo },
      { name: "Gemini AI", role: "AI Workflows", Logo: GeminiLogo },
    ],
  },
];

export function ExperienceSection() {
  const { experience, personal } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 border-b border-white/[0.08]">
      <SectionHeading
        chapter="(05) Experience & Toolkit"
        title="Turning ideas into shipped features."
        subtitle="Production engineering track record, architectural responsibilities, and technical tools."
        aside="Since 2024"
      />

      {/* Experience Timeline */}
      <div className="space-y-8 mb-16">
        {experience.map((exp) => (
          <div
            key={exp.company}
            className="p-6 sm:p-8 rounded-2xl border border-white/[0.08] bg-[#121217]/70 hover:bg-[#15151c] transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06] mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-zinc-800 text-[#e8a95c]">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-zinc-100">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">
                    {exp.company} · {exp.location}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs text-[#e8a95c] font-semibold px-2.5 py-1 rounded-full bg-[#e8a95c]/10 border border-[#e8a95c]/25 w-fit">
                {exp.period}
              </span>
            </div>

            {/* Highlights List */}
            <ul className="space-y-3 mb-6">
              {exp.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-[#e8a95c] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* Tech used in role */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2 py-0.5 rounded bg-zinc-900 border border-white/[0.06] text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Toolkit: Compact Grounded 3-Card Structure with Horizontal Skew */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Technical Toolkit
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Production tools and frameworks arranged into 3 compact core disciplines.
            </p>
          </div>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-mono text-[#e8a95c] hover:underline shrink-0"
          >
            <span>Full Profile on LinkedIn</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 3 Grounded White Cards with Smooth Horizontal Skew (skewX) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {threeToolkitCards.map((card) => (
            <motion.div
              key={card.category}
              whileHover={{
                skewX: -1.5,
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 240,
                  damping: 24,
                  mass: 0.8,
                },
              }}
              className="group rounded-2xl bg-white text-zinc-950 p-4 sm:p-5 border border-zinc-200/90 shadow-lg hover:shadow-[0_20px_40px_-12px_rgba(232,169,92,0.18)] hover:border-[#e8a95c] transition-colors duration-300 relative overflow-hidden flex flex-col justify-between cursor-default"
            >
              {/* Subtle amber accent bar at the top on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-transparent group-hover:bg-[#e8a95c] transition-colors duration-300" />

              <div>
                {/* Card Header (Compact) */}
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                    {card.number}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: card.color }}
                  />
                </div>

                <h4 className="text-base font-extrabold text-zinc-950 tracking-tight mt-0.5">
                  {card.category}
                </h4>
                <p className="text-[11px] text-zinc-500 mb-3 leading-tight font-normal">
                  {card.subtitle}
                </p>

                {/* Sub-list in a compact 2-Column Grid (Cuts card height in half!) */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 border-t border-zinc-100 pt-2.5">
                  {card.tools.map((tool) => {
                    const { Logo } = tool;
                    return (
                      <div
                        key={tool.name}
                        className="flex items-center gap-2 p-1.5 rounded-lg bg-zinc-50 hover:bg-zinc-100/90 transition-colors"
                      >
                        <div className="w-5 h-5 rounded bg-white shadow-xs flex items-center justify-center shrink-0 p-0.5 border border-zinc-200/60">
                          <Logo className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-zinc-900 truncate block leading-tight">
                            {tool.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 block truncate leading-none mt-0.5">
                            {tool.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-2.5 mt-3 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>{card.tools.length} Technologies</span>
                <span className="text-[#e8a95c] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Active in production ✓
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
