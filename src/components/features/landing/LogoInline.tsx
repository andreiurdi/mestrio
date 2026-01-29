'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [svgContent, setSvgContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch(getLogoPath());
        const text = await response.text();
        setSvgContent(text);
      } catch (error) {
        console.error("Failed to load SVG:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSvg();
  }, [variant]);

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

  if (isLoading) {
    return (
      <Link href="/" className={`inline-flex items-center shrink-0 ${className}`}>
        <div className={`${getSizeClasses()} bg-muted rounded animate-pulse`} />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 ${className}`}
      dangerouslySetInnerHTML={{
        __html: `<svg class="${getSizeClasses()}" ${svgContent.substring(
          svgContent.indexOf(" ") + 1
        )}`,
      }}
    />
  );
}
