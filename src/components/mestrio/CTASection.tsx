import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-6 py-20 md:py-28 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Ready to get started?
        </h2>
        
        <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 max-w-2xl">
          Join thousands of homeowners who have found trusted professionals through Mestrio. 
          Start your project today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/auth/register" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full group">
              Find local workers
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/auth/register?type=professional" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              Join as a professional
            </Button>
          </Link>
        </div>

        <p className="text-primary-foreground/70 text-sm mt-8">
          No credit card required • Free to browse • Instant messaging
        </p>
      </div>
    </section>
  );
}
