import { HeroSection } from "@/components/mestrio/HeroSection";
import { HowItWorksSection } from "@/components/mestrio/HowItWorksSection";
import { CTASection } from "@/components/mestrio/CTASection";
import { Footer } from "@/components/mestrio/Footer";

export default function PublicLandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </main>
  );
}
