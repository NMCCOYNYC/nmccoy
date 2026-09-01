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
          <Link href="/collection" className="product-bc">
            ← Collection
          </Link>
          <p className="product-no">{scarf.numberLabel}</p>
          <h1 className="product-title">{scarf.name}</h1>
          <p className="product-price">${siteSettings.fullPrice} USD</p>
          <p className="product-edition">
            Limited Edition · Final Sale
          </p>
          <div className="product-divider" />
          <p className="product-desc">{scarf.desc1}</p>
          <p className="product-desc">{scarf.desc2}</p>
          <div className="product-cta">
            <AddToCartButton
              slug={scarf.slug}
              label={`Collect ${scarf.name}`}
              disabled={!checkoutConfigured}
              disabledLabel={`Not yet available — $${siteSettings.fullPrice}`}
            />
            <Link
              href="/collection"
              className="btn btn--outline"
              style={{ textAlign: "center", width: "100%", padding: "1.1rem" }}
            >
              View the Collection
            </Link>
          </div>
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
                  "Complimentary tracked shipping within the US. International available. See Shipping & Returns for delivery and policy details.",
              },
              {
                title: "About the Painting",
                content: (
                  <>
                    <p>{scarf.painting}</p>
                    <p className="acc-content__note">
                      Original artwork hand-painted in ink on cold-press
                      watercolor paper.
                    </p>
                  </>
                ),
              },
            ]}
          />
          <p className="product-policy-note">
            <Link href="/shipping">Shipping & Returns</Link>
          </p>
        </FadeIn>
      </div>
      <Footer />
    </>
  );
}
