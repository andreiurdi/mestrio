import { HeroSection } from "@/components/mestrio/HeroSection";
import { HowItWorksSection } from "@/components/mestrio/HowItWorksSection";
import { FeaturesSection } from "@/components/mestrio/FeaturesSection";
import { CTASection } from "@/components/mestrio/CTASection";
import { Footer } from "@/components/mestrio/Footer";

export default function PublicLandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
