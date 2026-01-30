import { HeroSection, HowItWorksSection, FeaturesSection, CTASection, Footer } from "@/features/landing/components";

export default function Home() {
  return (
    <main className="flex flex-col gap-0">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
