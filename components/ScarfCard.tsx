"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Scarf } from "@/lib/products";
import {
  COLLECTION_PHOTO_SIZES,
  PRODUCT_PHOTO_QUALITY,
  getPrimaryImage,
  getScarfThumbGradients,
} from "@/lib/products";
import type { ProductGallerySlide } from "@/lib/scarf-gallery";
import { GradientFill } from "@/components/GradientFill";
import { FadeIn } from "@/components/FadeIn";

const AXIS_DIST = 12;
const AXIS_RATIO = 1.35;

export function ScarfCard({
  scarf,
  delay,
  slides = [],
  priority = false,
}: {
  scarf: Scarf;
  delay?: number;
  slides?: ProductGallerySlide[];
  priority?: boolean;
}) {
  const router = useRouter();
  const image = getPrimaryImage(scarf);
  const gallery = slides.length > 1;
  const placeholders = getScarfThumbGradients(scarf.gradient);
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const ignoreClick = useRef(false);
  const dragXRef = useRef(0);
  const gesture = useRef<{
    x: number;
    y: number;
    axis: "none" | "h" | "v";
  } | null>(null);

  const productHref = `/scarves/${scarf.slug}`;
  activeRef.current = active;

  const selectImage = useCallback(
    (i: number) => {
      if (!slides.length) return;
      const next = Math.max(0, Math.min(slides.length - 1, i));
      setActive(next);
      setDragX(0);
      setDragging(false);
    },
    [slides.length]
  );

  const go = (delta: number) => {
    selectImage(active + delta);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !gallery) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      gesture.current = { x: t.clientX, y: t.clientY, axis: "none" };
    };

    const onMove = (e: TouchEvent) => {
      const start = gesture.current;
      const t = e.touches[0];
      if (!start || !t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;

      if (start.axis === "none") {
        if (Math.hypot(dx, dy) < AXIS_DIST) return;
        start.axis =
          Math.abs(dx) > Math.abs(dy) * AXIS_RATIO && Math.abs(dx) > AXIS_DIST
            ? "h"
            : "v";
        if (start.axis !== "h") return;
      }

      if (start.axis === "v") return;

      ignoreClick.current = true;
      setDragging(true);
      const atStart = activeRef.current === 0 && dx > 0;
      const atEnd = activeRef.current === slides.length - 1 && dx < 0;
      const nextX = atStart || atEnd ? dx * 0.35 : dx;
      dragXRef.current = nextX;
      setDragX(nextX);
    };

    const onEnd = () => {
      const start = gesture.current;
      gesture.current = null;
      if (!start || start.axis !== "h") {
        setDragging(false);
        setDragX(0);
        return;
      }
      const width = track.clientWidth || 1;
      const threshold = Math.max(40, width * 0.18);
      const current = activeRef.current;
      if (dragXRef.current < -threshold) selectImage(current + 1);
      else if (dragXRef.current > threshold) selectImage(current - 1);
      else {
        setDragX(0);
        setDragging(false);
      }
    };

    track.addEventListener("touchstart", onStart, { passive: true });
    track.addEventListener("touchmove", onMove, { passive: true });
    track.addEventListener("touchend", onEnd, { passive: true });
    track.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onStart);
      track.removeEventListener("touchmove", onMove);
      track.removeEventListener("touchend", onEnd);
      track.removeEventListener("touchcancel", onEnd);
    };
  }, [gallery, selectImage, slides.length]);

  dragXRef.current = dragX;

  function onMediaClick(e: React.MouseEvent) {
    if (ignoreClick.current) {
      e.preventDefault();
      ignoreClick.current = false;
    }
  }

  const slideImage = (slide: ProductGallerySlide, i: number) =>
    slide.src ? (
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
        sizes={COLLECTION_PHOTO_SIZES}
        quality={PRODUCT_PHOTO_QUALITY}
        priority={priority && i === 0}
      />
    ) : (
      <GradientFill
        gradient={placeholders[i] ?? scarf.gradient}
        className="sc-card__img-fill"
      />
    );

  const media = gallery ? (
    <>
      <div ref={trackRef} className="sc-card__track">
        <div
          className="sc-card__rail"
          style={{
            transform: `translate3d(calc(${-active * 100}% + ${dragX}px), 0, 0)`,
            transition: dragging
              ? "none"
              : "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {slides.map((slide, i) => (
            <Link
              key={`${slide.src ?? "placeholder"}-${i}`}
              href={productHref}
              prefetch
              className="sc-card__slide"
              aria-label={`${scarf.name} silk scarf`}
              onClick={onMediaClick}
            >
              {slideImage(slide, i)}
            </Link>
          ))}
        </div>
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
    <Link href={productHref} prefetch className="sc-card__media-link">
      <Image
        src={image}
        alt={`${scarf.name} silk scarf`}
        fill
        className="sc-card__img-fill"
        style={{ objectFit: "cover" }}
        sizes={COLLECTION_PHOTO_SIZES}
        quality={PRODUCT_PHOTO_QUALITY}
        priority={priority}
      />
    </Link>
  ) : (
    <Link href={productHref} prefetch className="sc-card__media-link">
      <GradientFill gradient={scarf.gradient} className="sc-card__img-fill" />
    </Link>
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
        onMouseEnter={() => router.prefetch(productHref)}
      >
        <div className="sc-card__img">
          {media}
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
        </div>
        <Link href={productHref} prefetch className="sc-card__body">
          {body}
        </Link>
      </article>
    </FadeIn>
  );
}
