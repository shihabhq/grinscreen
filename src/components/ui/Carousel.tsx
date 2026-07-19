"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { clsx } from "clsx";

interface CarouselProps {
  images: string[];
  title: string;
  aspectRatio?: string;
}

export function Carousel({
  images,
  title,
  aspectRatio = "1/1",
}: CarouselProps) {
  const prefersReduced = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: images.length > 1,
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (images.length === 1) {
    return (
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ aspectRatio }}
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    );
  }

  return (
    <div
      className="relative group"
      role="group"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div
              key={src}
              className="flex-none w-full"
              style={{ aspectRatio }}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${images.length}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`${title}  image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {!prefersReduced && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center text-fg opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-sm flex items-center justify-center text-fg opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus-visible:opacity-100"
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3" aria-live="polite">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={clsx(
              "h-1.5 rounded-full transition-all duration-300",
              i === selectedIndex
                ? "bg-brand-bright w-4"
                : "bg-border hover:bg-fg-muted w-1.5",
            )}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
