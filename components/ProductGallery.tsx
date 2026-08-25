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
  const hasImages = images.length > 0;

  if (hasImages) {
    const current = images[Math.min(active, images.length - 1)];
    return (
      <>
        <div
          className="product-main"
          style={ratio ? { aspectRatio: ratio } : undefined}
        >
          <Image
            src={current}
            alt={`${scarfName} silk scarf — view ${active + 1}`}
            fill
            className="product-main-fill"
            style={{ objectFit: "cover" }}
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
                onClick={() => setActive(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActive(i)}
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
