"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "../ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface NavItem {
  id: string;
  label: string;
}

const navLinks: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function TopNavigation() {
  const { personal } = PORTFOLIO_DATA;
  const [currentTime, setCurrentTime] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Timezone clock
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat([], options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);

    // Scroll spy for active section
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    navLinks.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Detect if at the very top of the page
    const handleScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09090b]/92 backdrop-blur-xl shadow-lg shadow-black/40">
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Left Side: Mobile Hamburger (on the left) + Developer Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 z-10">
          {/* Mobile Left Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/[0.1] bg-[#121217] text-zinc-200 hover:text-white hover:bg-[#181820] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Developer Logo: aiwaziri05.dev */}
          <a
            href="#home"
            className="group flex items-center gap-1 font-mono text-sm sm:text-base font-bold tracking-tight text-zinc-100 hover:text-white transition-colors"
          >
            <span className="text-zinc-500 group-hover:text-zinc-400">&lt;</span>
            <span>aiwaziri05</span>
            <span className="text-[#e8a95c]">.dev</span>
            <span className="text-zinc-500 group-hover:text-zinc-400">/&gt;</span>
          </a>
        </div>

        {/* Center: Mathematically Dead-Centered Navigation (Absolute 50% placement) */}
        <nav
          aria-label="Main chapters"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-8 text-xs font-mono z-10"
        >
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`transition-colors duration-150 select-none py-1 relative ${
                  isActive
                    ? "text-[#e8a95c] font-bold"
                    : "text-zinc-400 hover:text-[#e8a95c]"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#e8a95c] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Ambient Info & Quick Actions */}
        <div className="flex items-center gap-3 sm:gap-4 z-10">
          {/* Timezone Clock (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-zinc-400">
            <span className="text-zinc-500">{personal.location}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-[#e8a95c] font-semibold">{currentTime || "--:--"} WAT</span>
          </div>

          {/* Social Icons (Desktop - Icon only, no text labels) */}
          <div className="hidden sm:flex items-center gap-1">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>

          {/* WhatsApp Direct Action (Crisp white icon on WhatsApp green) */}
          <a
            href={personal.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md shadow-[#25D366]/20 transition-all active:scale-95"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 text-white" />
          </a>

          {/* Primary Let's Talk CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#e8a95c] hover:bg-[#f3c285] text-zinc-950 font-bold text-xs transition-all shadow-sm active:scale-95 shrink-0"
          >
            <span>Let&apos;s talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* Mobile Slide-down Drawer (Accessible from left hamburger) */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-white/[0.08] bg-[#0c0c10]/98 backdrop-blur-2xl p-5 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4 text-xs font-mono text-zinc-400">
            <span>{personal.location} · {currentTime} WAT</span>
            <span className="text-[#e8a95c] font-bold">aiwaziri05.dev</span>
          </div>

          <nav className="flex flex-col gap-2 mb-6">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-mono transition-colors rounded-lg ${
                    isActive
                      ? "text-[#e8a95c] font-bold bg-[#e8a95c]/10"
                      : "text-zinc-300 hover:text-[#e8a95c] hover:bg-white/[0.03]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Socials & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white p-1"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white p-1"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={personal.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#e8a95c] text-zinc-950 text-xs font-bold"
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
