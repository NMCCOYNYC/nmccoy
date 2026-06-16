"use client";

import Link from "next/link";
import type { Scarf } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";
import { FadeIn } from "@/components/FadeIn";

export function ScarfCard({
  scarf,
  delay,
}: {
  scarf: Scarf;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <Link href={`/scarves/${scarf.slug}`} className="sc-card">
        <div className="sc-card__img">
          <GradientFill gradient={scarf.gradient} className="sc-card__img-fill" />
        </div>
        <div className="sc-card__body">
          <p className="sc-card__no">No. {scarf.number}</p>
          <h2 className="sc-card__name">{scarf.name}</h2>
          <p className="sc-card__meta">Silk Twill · 90×90cm · Limited Edition</p>
          <span className="sc-card__cta">View Piece</span>
        </div>
      </Link>
    </FadeIn>
  );
}
