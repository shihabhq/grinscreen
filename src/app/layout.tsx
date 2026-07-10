import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grinscreen Digital — Reels that go viral",
    template: "%s | Grinscreen Digital",
  },
  description:
    "360° digital marketing agency based in Bangladesh. Short-form reels that rack up millions of views, static design, campaigns, ads, and full-service brand management.",
  metadataBase: new URL("https://grinscreen.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://grinscreen.vercel.app",
    siteName: "Grinscreen Digital",
    images: [{ url: "/grinscreen/logo.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/grinscreen/logo.png",
    apple: "/grinscreen/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body className="bg-bg text-fg font-sans min-h-dvh flex flex-col antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
