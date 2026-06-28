import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GrinScreen Digital — Launching Soon",
  description:
    "GrinScreen Digital is launching soon. Follow us on Instagram @grinscreen.digital and Facebook for updates.",
  openGraph: {
    images: ["/coming-soon.jpg"],
  },
};

export default function Home() {
  return (
    <>
      {/* Preload desktop image — Next.js App Router hoists <link> to <head> */}
      <link
        rel="preload"
        as="image"
        href="/coming-soon.jpg"
        media="(min-width: 1024px)"
      />
      <div className="w-screen h-screen overflow-hidden">
        <picture>
          <source
            media="(max-width: 639px)"
            srcSet="/coming-soon-mobile.png"
          />
          <source
            media="(min-width: 640px) and (max-width: 1023px)"
            srcSet="/coming-soon-tablet-potrait.png"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/coming-soon.jpg"
            alt="GrinScreen Digital — Launching Soon. Follow @grinscreen.digital on Instagram and Facebook."
            fetchPriority="high"
            className="w-full h-full object-cover object-center block"
          />
        </picture>
      </div>
    </>
  );
}
