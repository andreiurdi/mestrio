import Link from "next/link";

interface LogoInlineProps {
  variant?: "horizontal" | "icon" | "vertical";
  className?: string;
  showTagline?: boolean;
}

export function LogoInline({
  variant = "horizontal",
  className = "",
  showTagline = false,
}: LogoInlineProps) {
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

  const getSizeClasses = () => {
    switch (variant) {
      case "icon":
        return "h-8 w-8";
      case "vertical":
        return "w-72 h-auto";
      case "horizontal":
      default:
        return "h-16 w-auto";
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
        className={`${getSizeClasses()}`}
        style={{ display: "block" }}
      />
      {showTagline && variant === "vertical" && (
        <span className="text-xs text-muted-foreground font-medium">
          Meșteri locali, la un click
        </span>
      )}
    </Link>
  );
}
