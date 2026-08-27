"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import type { StoryImage } from "@/lib/story";

const INTERVAL_MS = 2500;

export function FadeCarousel({
  images,
  sizes,
  ariaLabel,
  className = "",
}: {
  images: StoryImage[];
  sizes: string;
  ariaLabel: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const looping = images.length > 1;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || !looping) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, looping, images.length]);

  useEffect(() => {
    const onVisibility = () => {
      setPaused(document.hidden);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (images.length === 0) return null;

  return (
    <div
      className={`fade-carousel ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={`world-carousel__slide${index === active ? " is-active" : ""}`}
          aria-hidden={index !== active}
        >
          <Image
            src={image.src}
            alt={index === active ? image.alt : ""}
            fill
            className="story-band__img-fill"
            style={{ objectFit: "cover", objectPosition: "center center" }}
            sizes={sizes}
          />
        </div>
      ))}

      {looping ? (
        <div className="world-dots" role="tablist" aria-label={ariaLabel}>
          {images.map((image, index) => (
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
  );
}
