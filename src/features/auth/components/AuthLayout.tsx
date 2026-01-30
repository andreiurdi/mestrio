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
          <Link href="/public" className="inline-block mb-12">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Mestrio</h1>
          </Link>

          {/* Form Content */}
          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block lg:flex-1 relative bg-muted">
        <Image src="/images/authentication-image.png" alt="Authentication illustration" fill className="object-cover" priority />
      </div>
    </div>
  );
}
