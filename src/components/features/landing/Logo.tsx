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
        return "/brand/mestrio_v3_icon.svg";
      case "vertical":
        return "/brand/mestrio_v2_full.svg";
      case "horizontal":
      default:
        return "/brand/mestrio_v3_full.svg";
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
      <img
        src={getLogoPath()}
        alt="Mestrio"
        width={sizeProps.width}
        height={sizeProps.height}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
        }}
      />
      {/*{showTagline && variant === "vertical" && <span className="text-xs text-muted-foreground font-medium">Meșteri locali, la un click</span>}*/}
    </Link>
  );
}
