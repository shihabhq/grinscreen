"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";

const half = Math.ceil(clients.length / 2);
// Double each half  animation moves exactly -50% (one full copy) then resets invisibly
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

      <div className="flex flex-col gap-6">
        {/* Row 1  left */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="gs-track"
            style={{ animation: "gs-scroll-left 18s linear infinite" }}
          >
            {row1.map((client, i) => (
              <div
                key={`r1-${client.id}-${i}`}
                style={{
                  width: "7rem",
                  flexShrink: 0,
                  marginRight: "1.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  borderRadius: "8px",
                  padding: "6px",
                }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={112}
                  height={56}
                  className="max-h-12 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2  right */}
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="gs-track"
            style={{ animation: "gs-scroll-right 22s linear infinite" }}
          >
            {row2.map((client, i) => (
              <div
                key={`r2-${client.id}-${i}`}
                style={{
                  width: "7rem",
                  flexShrink: 0,
                  marginRight: "1.5rem",
                  height: "3.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#ffffff",
                  borderRadius: "8px",
                  padding: "6px",
                }}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={112}
                  height={56}
                  className="max-h-12 w-auto object-contain"
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
