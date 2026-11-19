import { TopNavigation } from "@/components/navigation/TopNavigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { InteractiveProjectStudio } from "@/components/sections/InteractiveProjectStudio";
import { NowBuildingSection } from "@/components/sections/NowBuildingSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { MottoSection } from "@/components/sections/MottoSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MotionReveal } from "@/components/ui/MotionReveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#e8a95c]/25 selection:text-white pb-12">
      {/* 1. Wide Sticky Top Navigation with Unified Menu & Mobile Drawer */}
      <TopNavigation />

      {/* Main Content Flow */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />

        <MotionReveal>
          <AboutSection />
        </MotionReveal>

        <MotionReveal>
          <ServicesSection />
        </MotionReveal>

        {/* Interactive Project Studio (Master-Detail, reduces scroll by >60%) */}
        <MotionReveal>
          <InteractiveProjectStudio />
        </MotionReveal>

        <MotionReveal>
          <NowBuildingSection />
        </MotionReveal>

        <MotionReveal>
          <ExperienceSection />
        </MotionReveal>

        <MotionReveal>
          <TestimonialsSection />
        </MotionReveal>

        <MotionReveal>
          <MottoSection />
        </MotionReveal>

        <MotionReveal>
          <ContactSection />
        </MotionReveal>
      </main>
    </div>
  );
}
