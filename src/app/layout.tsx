import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mestrio - Find Construction Workers Near You",
  description: "Connect with verified electricians, plumbers, painters, and carpenters in your area. Get quotes, read reviews, and hire with confidence.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
