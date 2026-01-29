import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mestrio - Find Construction Workers Near You",
  description: "Connect with verified electricians, plumbers, painters, and carpenters in your area. Get quotes, read reviews, and hire with confidence.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
