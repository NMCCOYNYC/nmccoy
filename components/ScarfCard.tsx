"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Scarf } from "@/lib/products";
import { getPrimaryImage, getScarfThumbGradients } from "@/lib/products";
import type { ProductGallerySlide } from "@/lib/scarf-gallery";
import { GradientFill } from "@/components/GradientFill";
import { FadeIn } from "@/components/FadeIn";

export function ScarfCard({
  scarf,
  delay,
  slides = [],
}: {
  scarf: Scarf;
  delay?: number;
  slides?: ProductGallerySlide[];
}) {
  const image = getPrimaryImage(scarf);
  const gallery = slides.length > 1;
  const placeholders = getScarfThumbGradients(scarf.gradient);
  const [active, setActive] = useState(0);

  const go = (delta: number) => {
    setActive((i) => (i + delta + slides.length) % slides.length);
  };

  return (
    <FadeIn delay={delay}>
      <Link
        href={`/scarves/${scarf.slug}`}
        className={`sc-card${gallery ? " sc-card--gallery" : ""}`}
        onMouseEnter={() => {
          if (gallery) setActive((i) => (i === 0 ? 1 : i));
        }}
        onMouseLeave={() => setActive(0)}
      >
        <div className="sc-card__img">
          {gallery ? (
            <>
              {slides.map((slide, i) => (
                <div
                  key={`${slide.src ?? "placeholder"}-${i}`}
                  className={`sc-card__slide${i === active ? " is-active" : ""}`}
                >
                  {slide.src ? (
                    <Image
                      src={slide.src}
                      alt={
                        i === 0
                          ? `${scarf.name} silk scarf`
                          : `${scarf.name} silk scarf — view ${i + 1}`
                      }
                      fill
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
              <button
                type="button"
                className="sc-card__nav sc-card__nav--prev"
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
                className="sc-card__nav sc-card__nav--next"
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
            <GradientFill
              gradient={scarf.gradient}
              className="sc-card__img-fill"
            />
          )}
        </div>
        <div className="sc-card__body">
          <p className="sc-card__no">No. {scarf.number}</p>
          <h2 className="sc-card__name">{scarf.name}</h2>
          <p className="sc-card__meta">Silk Twill · 90×90cm · Limited Edition</p>
        </div>
      </Link>
    </FadeIn>
  );
}
