"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { preconnect, prefetchDNS } from "react-dom";
import Script from "next/script";
import { site } from "@/data/site";

type Fbq = (...args: unknown[]) => void;

// Theme params (custom colours only apply on Calendly plans that support them).
const embedUrl =
  `${site.booking.url}?hide_gdpr_banner=1&background_color=101311` +
  `&text_color=e9ede8&primary_color=16c138`;

export function CalendlyEmbed() {
  const router = useRouter();

  // Open connections to Calendly early so the calendar appears sooner.
  prefetchDNS("https://calendly.com");
  preconnect("https://calendly.com");
  preconnect("https://assets.calendly.com");

  // Calendly posts a message to the parent window when a booking is made.
  // We use it to record a Meta Pixel "Schedule" event and send the visitor to
  // our own /thank-you page (no paid Calendly redirect feature needed).
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event !== "calendly.event_scheduled") return;
      const fbq = (window as unknown as { fbq?: Fbq }).fbq;
      fbq?.("track", "Schedule");
      router.push("/thank-you");
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [router]);

  return (
    <>
      {/* Taller on small screens (stacked layout) and tall enough on desktop for
          the time-slot and details steps, so Calendly never scrolls inside itself. */}
      <div className="relative h-[1180px] min-w-[320px] overflow-hidden rounded-2xl border border-border bg-surface sm:h-[1000px] lg:h-[880px]">
        {/* Placeholder visible until Calendly's iframe paints over it */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex flex-col items-center gap-4 p-8 pt-24 text-fg-muted"
        >
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-brand-bright" />
          <p className="font-mono text-xs uppercase tracking-widest">
            Loading calendar&hellip;
          </p>
        </div>
        <div
          className="calendly-inline-widget relative z-10"
          data-url={embedUrl}
          style={{ width: "100%", height: "100%", minWidth: 320 }}
        />
      </div>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
