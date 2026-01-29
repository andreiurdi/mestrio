"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  return (
    <section className="px-6 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Find local construction workers
      </h1>
      <p className="text-muted-foreground mb-12 max-w-xl text-lg">
        Connect with electricians, plumbers, painters, and carpenters in your area
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-2xl bg-card border border-border rounded-lg p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="service-type" className="text-sm font-medium text-left">
              Service type
            </label>
            <Input
              id="service-type"
              placeholder="Select service type"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-sm font-medium text-left">
              Location
            </label>
            <Input
              id="location"
              placeholder="Enter your location"
              type="text"
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Find local workers
        </Button>
      </form>
    </section>
  );
}
