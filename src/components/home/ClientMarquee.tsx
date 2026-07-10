"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";

const half = Math.ceil(clients.length / 2);
const row1Items = clients.slice(0, half);
const row2Items = clients.slice(half);

function MarqueeRow({ items, reverse }: { items: typeof clients; reverse?: boolean }) {
  const duration = reverse ? "22s" : "18s";
  const animName = reverse ? "gs-marquee-right" : "gs-marquee-left";

  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}
    >
      <div
        className="flex items-center"
        style={{
          animation: `${animName} ${duration} linear infinite`,
          willChange: "transform",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
      >
        {[...items, ...items].map((client, i) => (
          <div
            key={`${client.id}-${i}`}
            className="flex-none flex items-center justify-center"
            style={{ width: "6rem", marginRight: "1rem", height: "3.5rem" }}
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={96}
              height={56}
              className="max-h-12 w-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientMarquee() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes gs-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gs-marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="gs-marquee"] { animation: none !important; }
        }
      `}</style>

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

      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1Items} />
        <MarqueeRow items={row2Items} reverse />
      </div>
    </section>
  );
}
