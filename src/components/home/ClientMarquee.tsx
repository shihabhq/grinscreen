"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";

// Duplicate for seamless loop
const marqueeClients = [...clients, ...clients];

export function ClientMarquee() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">Trusted By</p>
          <h2
            className="font-display font-bold text-fg"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {clients.length}+ brands trust us<br />
            <span className="text-fg-muted">to tell their story.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div
          className="marquee-track flex gap-10 items-center"
          style={{
            animation: "marquee 40s linear infinite",
            width: "max-content",
          }}
        >
          {marqueeClients.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="flex-shrink-0 h-12 w-24 flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={96}
                height={48}
                className="max-h-12 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
