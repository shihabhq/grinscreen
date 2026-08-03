"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";

const half = Math.ceil(clients.length / 2);
const row1 = [...clients.slice(0, half), ...clients.slice(0, half)];
const row2 = [...clients.slice(half), ...clients.slice(half)];

export function ClientMarquee() {
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes gs-scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gs-scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .gs-track { display: flex; align-items: center; width: max-content; }
        .gs-track:hover { animation-play-state: paused !important; }
        .gs-logo-img {
          width: 160px;
          height: 80px;
          object-fit: contain;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.08));
          transition: filter 0.3s ease, opacity 0.3s ease;
          opacity: 1;
        }
        .gs-logo-img:hover {
          filter: drop-shadow(0 0 12px rgba(22, 193, 56, 0.35));
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">
            Trusted By
          </p>
          <h2
            className="font-display font-bold text-fg"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            {clients.length}+ brands trust us
            <br />
            <span className="text-fg-muted">to tell their story.</span>
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col gap-8">
        {/* Row 1 — left */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="gs-track"
            style={{ animation: "gs-scroll-left 22s linear infinite" }}
          >
            {row1.map((client, i) => (
              <div
                key={`r1-${client.id}-${i}`}
                style={{
                  flexShrink: 0,
                  marginRight: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="gs-logo-img"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="gs-track"
            style={{ animation: "gs-scroll-right 26s linear infinite" }}
          >
            {row2.map((client, i) => (
              <div
                key={`r2-${client.id}-${i}`}
                style={{
                  flexShrink: 0,
                  marginRight: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={80}
                  className="gs-logo-img"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
