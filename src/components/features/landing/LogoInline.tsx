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
      className={`inline-flex items-center shrink-0 ${className}`}
    >
      <svg
        className={getSizeClasses()}
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <use href={`${getLogoPath()}#logo`} />
      </svg>
      {showTagline && variant === "vertical" && (
        <span className="text-xs text-muted-foreground font-medium mt-2">
          Meșteri locali, la un click
        </span>
      )}
    </Link>
  );
}
