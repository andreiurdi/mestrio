import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "icon" | "vertical";
  className?: string;
  showTagline?: boolean;
}

export function Logo({ variant = "horizontal", className = "", showTagline = false }: LogoProps) {
  if (variant === "icon") {
    return (
      <Link href="/" className={`inline-flex items-center ${className}`}>
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2F792fdc7e57f645bf856006ca3e669800?format=webp&width=800&height=1200"
          alt="Mestrio"
          width={32}
          height={32}
          priority
        />
      </Link>
    );
  }

  if (variant === "vertical") {
    return (
      <Link href="/" className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <Image
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2F486c52d6010d42709342508c44f9ac88?format=webp&width=800&height=1200"
          alt="Mestrio"
          width={280}
          height={150}
          priority
          style={{ width: "auto", height: "auto" }}
        />
        {showTagline && (
          <span className="text-xs text-muted-foreground font-medium">Meșteri locali, la un click</span>
        )}
      </Link>
    );
  }

  // Horizontal variant (default)
  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Fbb09e30b392a4eff883c1d05f685b763?format=webp&width=800&height=1200"
        alt="Mestrio"
        width={200}
        height={80}
        priority
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
}
