import AnnouncementBar from "@/components/landing/AnnouncementBar";
import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import MeetingCarousel from "@/components/landing/MeetingCarousel";
import TeamStatsPillars from "@/components/landing/TeamStatsPillars";
import StickyCardAnimation from "@/components/landing/StickyCardAnimation";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-white font-sans antialiased selection:bg-[#00E5FF]/20 selection:text-[#00E5FF]">
      <AnnouncementBar />
      <LandingNav />
      <main className="flex-1">
        {/* Section 1: Hero Section (Reference 1) - Full Width */}
        <Hero />

        {/* Section 2: Below Hero Section Meeting Carousel (Reference 2) */}
        <MeetingCarousel />

        {/* Section 2.5: Fathom Teams Work Smarter - Animated Rising Stat Columns */}
        <TeamStatsPillars />

        {/* Section 3: Pinned Scroll-Driven Card Animation Section (References 3, 4, 5) */}
        <StickyCardAnimation />

        {/* Final Conversion CTA */}
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
