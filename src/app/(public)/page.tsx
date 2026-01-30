import { HeroSection, HowItWorksSection, FeaturesSection, CTASection, Footer } from "@/features/landing/components";

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
