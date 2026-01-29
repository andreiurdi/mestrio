import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="px-6 py-20 bg-background">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Ready to find the right professional?
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/auth/register">
            <Button size="lg">Find local workers</Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" size="lg">
              Join as a professional
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
