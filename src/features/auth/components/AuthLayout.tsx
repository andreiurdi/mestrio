import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:py-16 lg:px-12 xl:px-20">
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
      <div className="hidden lg:flex lg:flex-1 relative bg-linear-to-br from-muted to-muted/80 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-background to-background opacity-40" />
        <Image src="/images/authentication-image.png" alt="Authentication illustration" fill className="object-cover relative z-10" priority />
      </div>
    </div>
  );
}
