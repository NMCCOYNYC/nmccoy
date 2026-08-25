"use client";

import { useState } from "react";
import Image from "next/image";
import { getScarfThumbGradients } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";

export function ProductGallery({
  gradient,
  scarfName,
  images = [],
}: {
  gradient: string;
  scarfName: string;
  images?: string[];
}) {
  const [active, setActive] = useState(0);
  const [ratio, setRatio] = useState<string | undefined>(undefined);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const hasImages = images.length > 0;

  const ZOOM = 2.4;

  const updateOrigin = (
    clientX: number,
    clientY: number,
    rect: DOMRect
  ) => {
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setOrigin(
      `${Math.max(0, Math.min(100, x))}% ${Math.max(0, Math.min(100, y))}%`
    );
  };

  const selectImage = (i: number) => {
    setActive(i);
    setZoomed(false);
  };

  if (hasImages) {
    const current = images[Math.min(active, images.length - 1)];
    return (
      <>
        <div
          className={`product-main${zoomed ? " is-zoomed" : ""}`}
          style={ratio ? { aspectRatio: ratio } : undefined}
          onClick={(e) => {
            if (!zoomed) {
              updateOrigin(
                e.clientX,
                e.clientY,
                e.currentTarget.getBoundingClientRect()
              );
            }
            setZoomed((z) => !z);
          }}
          onMouseMove={(e) => {
            if (zoomed) {
              updateOrigin(
                e.clientX,
                e.clientY,
                e.currentTarget.getBoundingClientRect()
              );
            }
          }}
          onMouseLeave={() => setZoomed(false)}
          onTouchMove={(e) => {
            if (zoomed && e.touches[0]) {
              updateOrigin(
                e.touches[0].clientX,
                e.touches[0].clientY,
                e.currentTarget.getBoundingClientRect()
              );
            }
          }}
        >
          <Image
            src={current}
            alt={`${scarfName} silk scarf — view ${active + 1}`}
            fill
            className="product-main-fill"
            style={{
              objectFit: "cover",
              transform: zoomed ? `scale(${ZOOM})` : "scale(1)",
              transformOrigin: origin,
              transition: "transform 0.25s ease",
            }}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth && img.naturalHeight) {
                setRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
              }
            }}
          />
        </div>
        {images.length > 1 ? (
          <div className="product-thumbs">
            {images.map((src, i) => (
              <div
                key={src}
                className={`product-thumb${i === active ? " active" : ""}`}
                onClick={() => selectImage(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && selectImage(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        ) : null}
      </>
    );
  }

  const thumbs = getScarfThumbGradients(gradient);
  return (
    <>
      <div className="product-main">
        <GradientFill
          gradient={thumbs[active]}
          className="product-main-fill"
          style={{ position: "absolute", inset: 0 }}
          aria-label={`${scarfName} silk scarf — view ${active + 1}`}
        />
      </div>
      <div className="product-thumbs">
        {thumbs.map((g, i) => (
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
