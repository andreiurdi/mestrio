import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <div className="font-bold text-xl text-primary">Mestrio</div>
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost">Sign in</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Get started</Button>
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
