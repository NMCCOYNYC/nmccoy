"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Scarf } from "@/lib/products";
import { getPrimaryImage, getScarfThumbGradients } from "@/lib/products";
import type { ProductGallerySlide } from "@/lib/scarf-gallery";
import { GradientFill } from "@/components/GradientFill";
import { FadeIn } from "@/components/FadeIn";

function canHover() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export function ScarfCard({
  scarf,
  delay,
  slides = [],
}: {
  scarf: Scarf;
  delay?: number;
  slides?: ProductGallerySlide[];
}) {
  const router = useRouter();
  const image = getPrimaryImage(scarf);
  const gallery = slides.length > 1;
  const placeholders = getScarfThumbGradients(scarf.gradient);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const startScroll = useRef(0);

  const selectImage = useCallback(
    (i: number) => {
      if (!slides.length) return;
      const next = (i + slides.length) % slides.length;
      setActive(next);
      const track = trackRef.current;
      if (track) {
        track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
      }
    },
    [slides.length]
  );

  const go = (delta: number) => {
    selectImage(active + delta);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !gallery) return;

    const onScroll = () => {
      const i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
      setActive(Math.max(0, Math.min(slides.length - 1, i)));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [gallery, slides.length]);

  const media = gallery ? (
    <>
      <div
        ref={trackRef}
        className="sc-card__track"
        onPointerDown={() => {
          startScroll.current = trackRef.current?.scrollLeft ?? 0;
        }}
        onClick={(e) => {
          const scrolled = Math.abs(
            (trackRef.current?.scrollLeft ?? 0) - startScroll.current
          );
          if (scrolled > 8) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          router.push(`/scarves/${scarf.slug}`);
        }}
      >
        {slides.map((slide, i) => (
          <div key={`${slide.src ?? "placeholder"}-${i}`} className="sc-card__slide">
            {slide.src ? (
              <Image
                src={slide.src}
                alt={
                  i === 0
                    ? `${scarf.name} silk scarf`
                    : `${scarf.name} silk scarf — view ${i + 1}`
                }
                fill
                draggable={false}
                className="sc-card__img-fill"
                style={{ objectFit: "cover" }}
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                priority={i === 0}
              />
            ) : (
              <GradientFill
                gradient={placeholders[i] ?? scarf.gradient}
                className="sc-card__img-fill"
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="gallery-nav gallery-nav--prev"
        aria-label={`Previous ${scarf.name} image`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          go(-1);
        }}
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M8 2.25 3.75 6 8 9.75" />
        </svg>
      </button>
      <button
        type="button"
        className="gallery-nav gallery-nav--next"
        aria-label={`Next ${scarf.name} image`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          go(1);
        }}
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M4 2.25 8.25 6 4 9.75" />
        </svg>
      </button>
    </>
  ) : image ? (
    <Image
      src={image}
      alt={`${scarf.name} silk scarf`}
      fill
      className="sc-card__img-fill"
      style={{ objectFit: "cover" }}
      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
    />
  ) : (
    <GradientFill gradient={scarf.gradient} className="sc-card__img-fill" />
  );

  const body = (
    <>
      <p className="sc-card__no">No. {scarf.number}</p>
      <h2 className="sc-card__name">{scarf.name}</h2>
      <p className="sc-card__meta">Silk Twill · 90×90cm · Limited Edition</p>
    </>
  );

  return (
    <FadeIn delay={delay}>
      <article
        className={`sc-card${gallery ? " sc-card--gallery" : ""}`}
        onMouseEnter={() => {
          if (gallery && canHover()) selectImage(active === 0 ? 1 : active);
        }}
        onMouseLeave={() => {
          if (gallery && canHover()) selectImage(0);
        }}
      >
        <div className="sc-card__img">{media}</div>
        {gallery ? (
          <div className="gallery-dots" role="tablist" aria-label={`${scarf.name} images`}>
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
        ) : null}
        <Link href={`/scarves/${scarf.slug}`} className="sc-card__body">
          {body}
        </Link>
      </article>
    </FadeIn>
  );
}
