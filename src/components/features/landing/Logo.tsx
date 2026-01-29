import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "icon" | "vertical";
  className?: string;
  showTagline?: boolean;
}

export function Logo({
  variant = "horizontal",
  className = "",
  showTagline = false,
}: LogoProps) {
  const getLogoPath = () => {
    switch (variant) {
      case "icon":
        return "/brand/mestrio_v4_icon.svg";
      case "vertical":
        return "/brand/mestrio_v4_full.svg";
      case "horizontal":
      default:
        return "/brand/mestrio_v4_full.svg";
    }
  };

  const getSizeStyles = () => {
    switch (variant) {
      case "icon":
        return { width: "32px", height: "32px" };
      case "vertical":
        return { width: "288px", height: "auto" };
      case "horizontal":
      default:
        return { width: "auto", height: "64px" };
    }
  };

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center gap-2 shrink-0 ${className}`}
    >
      <img
        src={getLogoPath()}
        alt="Mestrio"
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          ...getSizeStyles(),
        }}
      />
      {showTagline && variant === "vertical" && (
        <span className="text-xs text-muted-foreground font-medium">
          Meșteri locali, la un click
        </span>
      )}
    </Link>
  );
}
