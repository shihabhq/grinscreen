"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { statics } from "@/data/statics";

const slides = [...statics, ...statics, ...statics];

const AUTO_DELAY = 2200;

export function StaticsCarousel() {
  const prefersReduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    duration: 30,
  });

  useEffect(() => {
    if (!emblaApi || prefersReduced) return;
    const timer = setInterval(() => emblaApi.scrollNext(), AUTO_DELAY);
    return () => clearInterval(timer);
  }, [emblaApi, prefersReduced]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-3">
        {slides.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex-none w-[60%] sm:w-[30%] md:w-[22%]"
          >
            <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <Image
                src={src}
                alt={`Static design ${(i % statics.length) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 22vw"
                loading={i < 5 ? "eager" : "lazy"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
