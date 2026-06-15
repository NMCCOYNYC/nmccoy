"use client";

import { useState } from "react";
import { getScarfThumbGradients } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";

export function ProductGallery({ gradient }: { gradient: string }) {
  const thumbs = getScarfThumbGradients(gradient);
  const [active, setActive] = useState(0);

  return (
    <>
      <div className="product-main">
        <GradientFill
          gradient={thumbs[active]}
          className="product-main-fill"
          style={{ position: "absolute", inset: 0 }}
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
