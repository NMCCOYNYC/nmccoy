"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Scarf } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";

function slidesPerView(width: number) {
  if (width < 600) return 1;
  if (width < 960) return 2;
  return 3;
}

export function ScarfCarousel({ scarves }: { scarves: Scarf[] }) {
  const [pos, setPos] = useState(0);
  const [spv, setSpv] = useState(3);

  useEffect(() => {
    const update = () => {
      setSpv(slidesPerView(window.innerWidth));
      setPos(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxPos = Math.max(0, scarves.length - spv);
  const slideW = 100 / spv;

  const move = (dir: number) => {
    setPos((p) => Math.max(0, Math.min(maxPos, p + dir)));
  };

  return (
    <section className="carousel-section" style={{ background: "var(--bone)" }}>
      <div className="carousel-wrap">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${pos * slideW}%)` }}
        >
          {scarves.map((scarf) => (
            <Link
              key={scarf.slug}
              href={`/scarves/${scarf.slug}`}
              className="carousel-slide"
              style={{ minWidth: `calc(${slideW}% - 1px)` }}
            >
              <div className="carousel-slide__img">
                <GradientFill
                  gradient={scarf.gradient}
                  className="carousel-slide__img-fill"
                />
              </div>
              <div className="carousel-slide__body">
                <p className="carousel-slide__no">No. {scarf.number}</p>
                <h3 className="carousel-slide__name">{scarf.name}</h3>
                <p className="carousel-slide__meta">
                  Silk Twill · 90×90cm · Limited Edition
                </p>
                <span className="carousel-slide__cta">Secure Your Piece</span>
              </div>
            </Link>
          ))}
        </div>
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
        <div className="carousel-arrows">
          <button
            type="button"
            className="carousel-arrow"
            disabled={pos === 0}
            onClick={() => move(-1)}
          >
            ← Prev
          </button>
          <button
            type="button"
            className="carousel-arrow"
            disabled={pos >= maxPos}
            onClick={() => move(1)}
          >
            Next →
          </button>
        </div>
      </div>
    </section>
  );
}
