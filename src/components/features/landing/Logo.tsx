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
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Ff231d418b6a64e8a8a54ee071debbeb4"
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
          src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Fbdfb223679a9469abdffe62580bc0e23"
          alt="Mestrio"
          width={280}
          height={150}
          priority
          style={{ width: "auto", height: "auto" }}
        />
        {showTagline && <span className="text-xs text-muted-foreground font-medium">Meșteri locali, la un click</span>}
      </Link>
    );
  }

  // Horizontal variant (default) - with title next to house
  return (
    <Link href="/" className={`inline-flex items-center shrink-0 ${className}`}>
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2Fadadeadcfd004af090dcf2211799ead3%2Fbdfb223679a9469abdffe62580bc0e23"
        alt="Mestrio"
        width={240}
        height={80}
        priority
        style={{ width: "auto", height: "auto", maxHeight: "56px" }}
      />
    </Link>
  );
}
