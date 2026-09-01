"use client";

import Link from "next/link";
import type { Scarf } from "@/lib/products";
import type { ProductGallerySlide } from "@/lib/scarf-gallery";
import { isCheckoutConfigured } from "@/lib/shopify/checkout";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ProductGallery } from "@/components/ProductGallery";
import { Accordion } from "@/components/Accordion";
import { AddToCartButton } from "@/components/AddToCartButton";

const PROVENANCE =
  "Original artwork hand-painted in ink on cold-press watercolor paper, then translated to 100% Italian silk twill.";

function storyParagraphs(text: string) {
  return text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ProductPageClient({
  scarf,
  slides,
}: {
  scarf: Scarf;
  slides: ProductGallerySlide[];
}) {
  const checkoutConfigured = isCheckoutConfigured(scarf);
  const isCarousel = slides.length > 1;

  return (
    <>
      <div className="product-wrap">
        <div
          className={`product-gallery${isCarousel ? " product-gallery--banner" : ""}`}
        >
          <ProductGallery
            gradient={scarf.gradient}
            scarfName={scarf.name}
            slides={slides}
          />
        </div>
        <FadeIn variant="reveal" className="product-info">
          <div className="product-info__identity">
            <div className="product-info__nav">
              <Link href="/collection" className="product-bc">
                ← Collection
              </Link>
              <p className="product-no">{scarf.numberLabel}</p>
            </div>
            <h1 className="product-title">{scarf.name}</h1>
            <div className="product-info__purchase">
              <p className="product-price">${siteSettings.fullPrice} USD</p>
              <p className="product-edition">Limited Edition of {siteSettings.editionSize}</p>
              <div className="product-divider" />
              <div className="product-cta">
                <AddToCartButton
                  slug={scarf.slug}
                  label={`Collect ${scarf.name}`}
                  disabled={!checkoutConfigured}
                  disabledLabel={`Not yet available — $${siteSettings.fullPrice}`}
                />
                <Link href="/collection" className="btn btn--outline product-cta__collection">
                  View the Collection
                </Link>
              </div>
            </div>
          </div>
          <div className="product-info__copy">
            <p className="product-info__kicker">The Story</p>
            <div className="product-info__story">
              {storyParagraphs(scarf.desc1).map((paragraph) => (
                <p className="product-desc" key={paragraph.slice(0, 48)}>
                  {paragraph}
                </p>
              ))}
              <p className="product-desc product-desc--material">{PROVENANCE}</p>
            </div>
            <div className="product-info__aside">
              <Accordion
                items={[
                  {
                    title: "Details",
                    content:
                      "90 × 90 cm · 100% Silk Twill · Hand-rolled edges · Made in Italy · Numbered certificate of authenticity · NMCCOY gift box",
                  },
                  {
                    title: "Care",
                    content:
                      "Professional dry clean only. If needed, iron gently on low heat. Store flat or loosely rolled and protect from moisture, direct sunlight, and contact with rough surfaces.",
                  },
                  {
                    title: "Shipping",
                    content:
                      "Complimentary tracked shipping within the US. International available. Due to the limited-edition nature of each piece, all sales are final. See Shipping & Returns for delivery and policy details.",
                  },
                ]}
              />
            </div>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </>
  );
}
