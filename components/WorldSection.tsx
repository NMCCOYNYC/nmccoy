"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { WorldImage } from "@/lib/world";

const INTERVAL_MS = 2500;

export function WorldSection({
  staticImage,
  carouselImages,
}: {
  staticImage: WorldImage;
  carouselImages: WorldImage[];
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = carouselImages.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || slideCount < 2) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slideCount);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, slideCount]);

  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section className="world-section" aria-labelledby="world-title">
      <h2 id="world-title" className="world-section__title">
        The World
      </h2>

      <div className="world-section__split">
        <figure className="world-frame">
          <Image
            src={staticImage.src}
            alt={staticImage.alt}
            fill
            className="world-frame__img world-frame__img--static"
            sizes="(max-width: 960px) 92vw, 40vw"
          />
        </figure>

        <div
          className="world-frame world-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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
