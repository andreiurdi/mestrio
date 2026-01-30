import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/features/landing/components/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:py-16 lg:px-12 xl:px-20">
        <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-12">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative h-8 w-32">
              <img src="/brand/mestrio-logo-horizontal.png" alt="Mestrio" className="h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-80" />
            </div>
          </Link>

          {/* Form Content */}
          <div className="space-y-8">{children}</div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-muted to-muted/80 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-background opacity-40" />
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Fc995a8d330514cd8a1b953b8e0b45fb7?format=webp&width=800&height=1200"
          alt="Authentication illustration"
          fill
          className="object-cover relative z-10"
          priority
        />
      </div>
    </div>
  );
}
