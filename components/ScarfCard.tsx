"use client";

import Link from "next/link";
import Image from "next/image";
import type { Scarf } from "@/lib/products";
import { getPrimaryImage } from "@/lib/products";
import { GradientFill } from "@/components/GradientFill";
import { FadeIn } from "@/components/FadeIn";
import { FavoriteButton } from "@/components/FavoriteButton";

export function ScarfCard({
  scarf,
  delay,
}: {
  scarf: Scarf;
  delay?: number;
}) {
  const image = getPrimaryImage(scarf);

  return (
    <FadeIn delay={delay}>
      <div className="sc-card">
        <Link href={`/scarves/${scarf.slug}`} className="sc-card__link">
          <div className="sc-card__img">
            {image ? (
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
        <FavoriteButton slug={scarf.slug} name={scarf.name} className="sc-card__fav" />
      </div>
    </FadeIn>
  );
}
