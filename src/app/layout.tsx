import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { MetaPixel } from "@/components/layout/MetaPixel";
import { site } from "@/data/site";
import { jsonLd } from "@/lib/seo";

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

const title = "GrinScreen | Digital Marketing Agency in Bangladesh";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s | GrinScreen",
  },
  description:
    "GrinScreen is a 360° digital marketing agency in Bangladesh. Viral short-form reels, social media campaigns, ad services, static design, photoshoots and full brand management.",
  applicationName: site.name,
  keywords: [
    "digital marketing agency Bangladesh",
    "digital marketing agency Dhaka",
    "reel making agency",
    "viral reels Bangladesh",
    "social media marketing Bangladesh",
    "social media campaigns",
    "ad services Bangladesh",
    "food photography Dhaka",
    "brand management agency",
    "GrinScreen",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "marketing",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description:
      "360° digital marketing agency in Bangladesh. Reels that rack up millions of views, campaigns, ads, design and full brand management.",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "360° digital marketing agency in Bangladesh. Reels that rack up millions of views.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <MetaPixel />
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
