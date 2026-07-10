import type { Metadata } from "next";
import { reels } from "@/data/reels";
import { staticProjects } from "@/data/statics";
import { clients } from "@/data/clients";
import { LazyVideo } from "@/components/media/LazyVideo";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Reels, static designs, and clients — Grinscreen Digital's full portfolio of digital marketing work.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <Reveal>
          <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">Portfolio</p>
          <h1
            className="font-display font-bold text-fg"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Work that speaks<br />
            <span className="text-fg-muted">for itself.</span>
          </h1>
        </Reveal>
      </section>

      {/* Reels */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="font-display font-semibold text-fg text-2xl">
              Reels
              <span className="ml-3 font-mono text-xs text-fg-muted">({reels.length})</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {reels.map((reel, i) => (
              <Reveal key={reel.id} delay={Math.min(i * 0.04, 0.3)}>
                <div className="rounded-lg overflow-hidden group relative">
                  <LazyVideo
                    src={reel.src}
                    poster={reel.poster}
                    title={reel.title}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-mono text-xs text-fg truncate">{reel.title}</p>
                    {reel.client && (
                      <p className="font-mono text-xs text-fg-muted">{reel.client}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Static designs */}
      <section className="py-24 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="font-display font-semibold text-fg text-2xl">Static Designs</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08}>
                <div>
                  <Carousel images={project.images} title={project.title} aspectRatio="1/1" />
                  <div className="mt-3">
                    <p className="font-display font-semibold text-fg text-sm">{project.title}</p>
                    {project.client && (
                      <p className="font-mono text-xs text-fg-muted mt-0.5">{project.client}</p>
                    )}
                    {project.images.length > 1 && (
                      <p className="font-mono text-xs text-brand-bright/60 mt-0.5">{project.images.length} designs</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Client wall */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="font-mono text-brand-bright text-xs uppercase tracking-widest mb-4">Our Clients</p>
            <h2
              className="font-display font-bold text-fg"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {clients.length}+ brands,<br />
              <span className="text-fg-muted">one goal.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
            {clients.map((client, i) => (
              <Reveal key={client.id} delay={Math.min(i * 0.03, 0.4)}>
                <div className="flex items-center justify-center p-3 rounded-lg hover:bg-surface-2 transition-colors duration-200 group">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={80}
                    height={60}
                    className="max-h-12 w-auto object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                    unoptimized
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
