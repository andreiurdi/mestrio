import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link href="/" className="inline-block mb-12">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Mestrio</h1>
          </Link>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:flex-1 relative bg-muted">
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Fc995a8d330514cd8a1b953b8e0b45fb7?format=webp&width=800&height=1200"
          alt="Authentication illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
