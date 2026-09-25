import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import FeatureTour from "@/components/landing/FeatureTour";
import PillarSection from "@/components/landing/PillarSection";
import IntegrationsStrip from "@/components/landing/IntegrationsStrip";
import FinalCTA from "@/components/landing/FinalCTA";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-app text-primary font-sans antialiased">
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <FeatureTour />
        <PillarSection />
        <IntegrationsStrip />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
