"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getScarfThumbGradients } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";
import type { ProductGallerySlide } from "@/lib/scarf-gallery";

export function ProductGallery({
  gradient,
  scarfName,
  slides = [],
}: {
  gradient: string;
  scarfName: string;
  slides?: ProductGallerySlide[];
}) {
  const [active, setActive] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const placeholders = getScarfThumbGradients(gradient);
  const hasHero = Boolean(slides[0]?.src);
  const isCarousel = slides.length > 1;

  const selectImage = useCallback((i: number) => {
    setActive(i);
    const root = stripRef.current;
    const target = slideRefs.current[i];
    if (!root || !target) return;
    root.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isCarousel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      const next =
        e.key === "ArrowRight"
          ? Math.min(active + 1, slides.length - 1)
          : Math.max(active - 1, 0);
      selectImage(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, isCarousel, selectImage, slides.length]);

  useEffect(() => {
    const root = stripRef.current;
    if (!root || !isCarousel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) setActive(index);
      },
      { root, threshold: [0.45, 0.6, 0.8] }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isCarousel, slides.length]);

  if (!hasHero) {
    return (
      <>
        <div className="product-main">
          <GradientFill
            gradient={placeholders[active]}
            className="product-main-fill"
            style={{ position: "absolute", inset: 0 }}
            aria-label={`${scarfName} silk scarf — view ${active + 1}`}
          />
        </div>
        <div className="product-thumbs">
          {placeholders.map((g, i) => (
            <div
              key={i}
              className={`product-thumb${i === active ? " active" : ""}`}
              style={{ background: g }}
              onClick={() => setActive(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActive(i)}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      </>
    );
  }

  if (!isCarousel) {
    const src = slides[0]?.src;
    return (
      <div className="product-main">
        {src ? (
          <Image
            src={src}
            alt={`${scarfName} silk scarf`}
            fill
            className="product-main-fill"
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div className="product-strip-wrap">
        <div className="product-strip" ref={stripRef}>
          {slides.map((slide, i) => (
            <figure
              key={`${slide.src ?? "placeholder"}-${i}`}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              data-index={i}
              className={`product-strip__slide ${i === 0 ? "product-strip__slide--square" : "product-strip__slide--portrait"}`}
            >
              {slide.src ? (
                <Image
                  src={slide.src}
                  alt={`${scarfName} silk scarf — view ${i + 1} of ${slides.length}`}
                  fill
                  draggable={false}
                  className="product-strip__img"
                  style={{ objectFit: "cover" }}
                  sizes={i === 0 ? "(max-width: 960px) 100vw, 50vw" : "(max-width: 960px) 80vw, 40vw"}
                  priority={i === 0}
                />
              ) : (
                <GradientFill
                  gradient={placeholders[i] ?? placeholders[0]}
                  className="product-strip__img"
                  style={{ position: "absolute", inset: 0 }}
                  aria-label={`${scarfName} silk scarf — styled view ${i}`}
                />
              )}
              {i === 0 ? (
                <div className="product-strip__thumbs">
                  {slides.map((thumb, t) => (
                    <button
                      key={`${thumb.src ?? "placeholder"}-thumb-${t}`}
                      type="button"
                      className={`product-strip__thumb${t === active ? " is-active" : ""}`}
                      onClick={() => selectImage(t)}
                      aria-label={`View image ${t + 1}`}
                      aria-current={t === active ? "true" : undefined}
                    >
                      {thumb.src ? (
                        <Image
                          src={thumb.src}
                          alt=""
                          fill
                          draggable={false}
                          style={{ objectFit: "cover" }}
                          sizes="48px"
                        />
                      ) : (
                        <GradientFill
                          gradient={placeholders[t] ?? placeholders[0]}
                          style={{ position: "absolute", inset: 0 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              ) : null}
            </figure>
          ))}
        </div>
        <button
          type="button"
          className="gallery-nav gallery-nav--prev"
          aria-label="Previous image"
          onClick={() => selectImage(Math.max(0, active - 1))}
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M8 2.25 3.75 6 8 9.75" />
          </svg>
        </button>
        <button
          type="button"
          className="gallery-nav gallery-nav--next"
          aria-label="Next image"
          onClick={() => selectImage(Math.min(slides.length - 1, active + 1))}
        >
          <svg viewBox="0 0 12 12" aria-hidden="true">
            <path d="M4 2.25 8.25 6 4 9.75" />
          </svg>
        </button>
      </div>
      <div className="gallery-dots" role="tablist" aria-label={`${scarfName} images`}>
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`gallery-dot${i === active ? " is-active" : ""}`}
            aria-label={`View image ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => selectImage(i)}
          />
        ))}
      </div>
    </>
  );
}
