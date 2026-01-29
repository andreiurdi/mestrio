import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "horizontal" | "icon";
  className?: string;
}

export function Logo({ variant = "horizontal", className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Link href="/" className={`inline-flex items-center ${className}`}>
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* House */}
            <path
              d="M16 32 L32 16 L48 32 V48 H16 Z"
              fill="none"
              stroke="#1e7fc1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Roof */}
            <path
              d="M20 40 H44"
              stroke="#f97316"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Location pin */}
            <circle cx="50" cy="18" r="4" fill="#1e7fc1" />
            <path
              d="M50 22 Q52 24 50 26 Q48 24 50 22"
              fill="#1e7fc1"
            />
            {/* Tools - Wrench */}
            <g transform="translate(28, 30)">
              <path
                d="M 2 8 Q 4 6 6 4 M 6 4 Q 8 2 10 0 M 10 0 L 12 2 Q 8 6 6 8"
                stroke="#1e3a8a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="4" cy="8" r="1.5" fill="#1e3a8a" />
            </g>
            {/* Plus sign */}
            <g transform="translate(30, 18)">
              <line x1="0" y1="-2" x2="0" y2="2" stroke="#1e7fc1" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="-2" y1="0" x2="2" y2="0" stroke="#1e7fc1" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight text-primary">Mestrio</span>
      </div>
    </Link>
  );
}
