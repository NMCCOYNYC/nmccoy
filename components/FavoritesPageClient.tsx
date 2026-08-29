"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/components/FavoritesProvider";
import { Footer } from "@/components/Footer";
import { getPrimaryImage, getScarfBySlug } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";

export function FavoritesPageClient() {
  const { slugs, remove } = useFavorites();
  const pieces = slugs
    .map((slug) => getScarfBySlug(slug))
    .filter((scarf): scarf is NonNullable<typeof scarf> => Boolean(scarf));

  return (
    <>
      <section className="cart-page">
        <p className="eyebrow">Favorites</p>
        <h1>Saved Pieces</h1>

        {pieces.length === 0 ? (
          <div className="cart-empty">
            <p>You have not saved any pieces yet.</p>
            <Link href="/collection" className="btn--underline">
              View the Collection
            </Link>
          </div>
        ) : (
          <ul className="cart-list">
            {pieces.map((scarf) => {
              const image = getPrimaryImage(scarf);
              return (
                <li key={scarf.slug} className="cart-item">
                  <Link href={`/scarves/${scarf.slug}`} className="cart-item__img">
                    {image ? (
                      <Image
                        src={image}
                        alt={scarf.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="120px"
                      />
                    ) : (
                      <span
                        className="cart-item__fallback"
                        style={{ background: scarf.gradient }}
                      />
                    )}
                  </Link>
                  <div className="cart-item__info">
                    <p className="cart-item__no">{scarf.numberLabel}</p>
                    <Link href={`/scarves/${scarf.slug}`} className="cart-item__name">
                      {scarf.name}
                    </Link>
                    <p className="cart-item__price">${siteSettings.fullPrice} USD</p>
                    <Link href={`/scarves/${scarf.slug}`} className="btn--underline">
                      View piece
                    </Link>
                    <button
                      type="button"
                      className="cart-item__remove"
                      onClick={() => remove(scarf.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <Footer />
    </>
  );
}
