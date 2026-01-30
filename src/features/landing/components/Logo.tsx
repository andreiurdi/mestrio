import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "icon" | "vertical";
  className?: string;
  showTagline?: boolean;
}

export function Logo({ variant = "horizontal", className = "", showTagline = false }: LogoProps) {
  const getLogoPath = () => {
    switch (variant) {
      case "icon":
        return "/brand/mestrio_v3_icon.png";
      case "vertical":
        return "/brand/mestrio-logo-vertical.png";
      case "horizontal":
      default:
        return "/brand/mestrio-logo-horizontal.png";
    }
  };

  const getSizeProps = () => {
    switch (variant) {
      case "icon":
        return { width: 32, height: 32 };
      case "vertical":
        return { width: 288, height: 288 };
      case "horizontal":
      default:
        return { width: 256, height: 64 };
    }
  };

  const sizeProps = getSizeProps();

  return (
    <Link href="/" className={`inline-flex flex-col items-center gap-2 shrink-0 ${className}`}>
      <img src={getLogoPath()} alt="Mestrio" />
      {/*{showTagline && variant === "vertical" && <span className="text-xs text-muted-foreground font-medium">Meșteri locali, la un click</span>}*/}
    </Link>
  );
}
