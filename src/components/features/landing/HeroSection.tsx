"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Logo } from "./Logo";

export function HeroSection() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <section className="px-6 py-16 md:py-24 flex flex-col items-center justify-center text-center bg-linear-to-b from-primary/5 to-background">
      <Logo variant="vertical" showTagline className="mb-0" />

      <Badge variant="outline" className="mb-6 border-primary/20 text-primary">
        Trusted by 10,000+ homeowners
      </Badge>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">Find construction workers in your area</h1>

      <p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
        Connect with skilled electricians, plumbers, painters, and carpenters. Get quotes, read reviews, and hire with confidence.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>Verified professionals</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>Real customer reviews</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-5 h-5 text-secondary" />
          <span>Instant messaging</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="w-full max-w-3xl bg-card border border-border rounded-xl p-6 md:p-8 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="service-type" className="text-sm font-medium text-left">
              What service do you need?
            </label>
            <Input id="service-type" placeholder="e.g., Electrician, Plumber, Painter" type="text" className="h-11" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-medium text-left">
              Where do you need it?
            </label>
            <Input id="location" placeholder="Enter your city or zip code" type="text" className="h-11" />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Find local workers
        </Button>
      </form>
    </section>
  );
}
