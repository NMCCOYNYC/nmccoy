"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Scarf } from "@/lib/products";
import {
  COLLECTION_PHOTO_SIZES,
  PRODUCT_PHOTO_QUALITY,
  getPrimaryImage,
} from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";

function slidesPerView(width: number) {
  if (width < 600) return 1;
  if (width < 960) return 2;
  return 3;
}

export function ScarfCarousel({
  scarves,
  variant = "default",
}: {
  scarves: Scarf[];
  variant?: "default" | "home";
}) {
  const [pos, setPos] = useState(0);
  const [spv, setSpv] = useState(3);
  const [imgH, setImgH] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const horizontal = useRef(false);
  const swiped = useRef(false);

  // On mobile (single view) show a sliver of the next card to invite swiping
  const basisFor = (view: number) => (view === 1 ? 82 : 100 / view);

  useEffect(() => {
    const update = () => {
      const view = slidesPerView(window.innerWidth);
      setSpv(view);
      setPos(0);
      const width = wrapRef.current?.clientWidth ?? 0;
      // slides are square (1:1), so image height ≈ slide width
      setImgH((width * basisFor(view)) / 100);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxPos = Math.max(0, scarves.length - spv);
  const slideW = basisFor(spv);
  const slidePx = imgH;
  // Clamp the track so the last slide aligns flush to the right edge
  const maxTranslate = Math.max(0, scarves.length * slideW - 100);
  const translatePct = Math.min(pos * slideW, maxTranslate);

  const move = (dir: number) => {
    setPos((p) => Math.max(0, Math.min(maxPos, p + dir)));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    dragStart.current = { x: t.clientX, y: t.clientY };
    horizontal.current = false;
    swiped.current = false;
    setDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragStart.current) return;
    const t = e.touches[0];
    const dx = t.clientX - dragStart.current.x;
    const dy = t.clientY - dragStart.current.y;
    if (!horizontal.current && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
      horizontal.current = true;
    }
    if (horizontal.current) {
      // add resistance when dragging past the first/last slide
      let d = dx;
      if ((pos === 0 && d > 0) || (pos >= maxPos && d < 0)) {
        d = d * 0.35;
      }
      setDragX(d);
    }
  };

  const onTouchEnd = () => {
    if (!dragStart.current) return;
    const threshold = Math.max(45, slidePx * 0.18);
    if (horizontal.current && Math.abs(dragX) > threshold) {
      move(dragX < 0 ? 1 : -1);
      swiped.current = true;
    }
    dragStart.current = null;
    setDragging(false);
    setDragX(0);
  };

  const sectionClass =
    variant === "home"
      ? "carousel-section carousel-section--home"
      : "carousel-section";

  const arrowStyle = imgH
    ? { top: `${imgH / 2}px` }
    : undefined;

  return (
    <section className={sectionClass}>
      <div
        className="carousel-wrap"
        ref={wrapRef}
        {...(variant === "home" ? { "data-hm": "group" } : {})}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(calc(-${translatePct}% + ${dragX}px))`,
            transition: dragging ? "none" : undefined,
          }}
        >
          {scarves.map((scarf) => {
            const image = getPrimaryImage(scarf);
            return (
              <Link
                key={scarf.slug}
                href={`/scarves/${scarf.slug}`}
                prefetch
                className="carousel-slide"
                {...(variant === "home" ? { "data-hm-child": "tile" } : {})}
                style={{ minWidth: `calc(${slideW}% - 1px)` }}
                draggable={false}
                onClick={(e) => {
                  if (swiped.current) {
                    e.preventDefault();
                    swiped.current = false;
                  }
                }}
              >
                <div className="carousel-slide__img">
                  {image ? (
                    <Image
                      src={image}
                      alt={`${scarf.name} silk scarf`}
                      fill
                      className="carousel-slide__img-fill"
                      style={{ objectFit: "cover" }}
                      sizes={COLLECTION_PHOTO_SIZES}
                      quality={PRODUCT_PHOTO_QUALITY}
                    />
                  ) : (
                    <GradientFill
                      gradient={scarf.gradient}
                      className="carousel-slide__img-fill"
                    />
                  )}
                </div>
                <div className="carousel-slide__body">
                  <p className="carousel-slide__no">No. {scarf.number}</p>
                  <h3 className="carousel-slide__name">{scarf.name}</h3>
                  <p className="carousel-slide__meta">
                    Silk Twill · 90×90cm · Limited Edition
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="carousel-nav carousel-nav--prev"
          style={arrowStyle}
          disabled={pos === 0}
          onClick={() => move(-1)}
          aria-label="Previous scarves"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="carousel-nav carousel-nav--next"
          style={arrowStyle}
          disabled={pos >= maxPos}
          onClick={() => move(1)}
          aria-label="Next scarves"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className="carousel-controls">
        <div className="carousel-dots">
          {Array.from({ length: maxPos + 1 }, (_, i) => (
            <div
              key={i}
              className={`carousel-dot${i === pos ? " active" : ""}`}
              onClick={() => setPos(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setPos(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
