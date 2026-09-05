"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";

import type { WorldImage } from "@/lib/world";

const INTERVAL_MS = 3200;

export function WorldSection({
  staticImage,
  carouselImages,
}: {
  staticImage: WorldImage;
  carouselImages: WorldImage[];
}) {
  const [active, setActive] = useState(0);
  const slideCount = carouselImages.length;

  useEffect(() => {
    if (slideCount < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((i) => (i + 1) % slideCount);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [slideCount]);

  return (
    <section className="world-section" aria-labelledby="world-title">
      <h2 id="world-title" className="world-section__title" data-hm="text">
        The World
      </h2>

      <div className="world-section__split">
        <figure className="world-frame" data-hm="clip">
          <Image
            src={staticImage.src}
            alt={staticImage.alt}
            fill
            className="world-frame__img world-frame__img--static"
            data-hm-depth=""
            sizes="(max-width: 960px) 92vw, 40vw"
          />
        </figure>

        <div
          className="world-frame world-carousel"
          data-hm="photo"
          style={{ "--hm-delay": "120ms" } as CSSProperties}
        >
          {carouselImages.map((image, index) => (
            <div
              key={image.src}
              className={`world-carousel__slide${index === active ? " is-active" : ""}`}
              aria-hidden={index !== active}
            >
              <Image
                src={image.src}
                alt={index === active ? image.alt : ""}
                fill
                className="world-frame__img"
                sizes="(max-width: 960px) 92vw, 40vw"
                priority={index === 0}
                loading="eager"
              />
            </div>
          ))}

          {slideCount > 1 ? (
            <div className="world-dots" role="tablist" aria-label="Campaign images">
              {carouselImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={`Show ${image.alt}`}
                  className={`world-dot${index === active ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
