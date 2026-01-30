import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mestrio - Find Construction Workers Near You",
  description: "Connect with verified electricians, plumbers, painters, and carpenters in your area. Get quotes, read reviews, and hire with confidence.",
  icons: {
    icon: "/favicon.svg",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  return (
    <html lang={locale || "en"}>
      <body className="min-h-screen bg-background text-foreground">{children}</body>
    </html>
  );
}
