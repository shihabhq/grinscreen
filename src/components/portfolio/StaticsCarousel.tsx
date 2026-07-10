"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { staticProjects } from "@/data/statics";

// Flatten all images and triple-duplicate for infinite feel
const allSlides = staticProjects.flatMap((project) =>
  project.images.map((src, i) => ({
    src,
    label: project.images.length > 1 ? `${project.title} ${i + 1}` : project.title,
    client: project.client,
  }))
);
const slides = [...allSlides, ...allSlides, ...allSlides];

const AUTO_DELAY = 2200;

export function StaticsCarousel() {
  const prefersReduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    duration: 30,
  });

  // Auto-advance one slide at a time
  useEffect(() => {
    if (!emblaApi || prefersReduced) return;
    const timer = setInterval(() => emblaApi.scrollNext(), AUTO_DELAY);
    return () => clearInterval(timer);
  }, [emblaApi, prefersReduced]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-3">
        {slides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            // Show ~4-5 at once: 22% on desktop, 60% on mobile
            className="flex-none w-[60%] sm:w-[30%] md:w-[22%]"
          >
            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image
                src={slide.src}
                alt={slide.label}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 22vw"
                loading={i < 5 ? "eager" : "lazy"}
              />
              {/* Label on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <p className="font-display font-semibold text-fg text-xs">{slide.label}</p>
                {slide.client && (
                  <p className="font-mono text-xs text-fg-muted">{slide.client}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
