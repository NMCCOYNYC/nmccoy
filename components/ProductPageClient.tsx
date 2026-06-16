"use client";

import Link from "next/link";
import type { Scarf } from "@/lib/products";
import { isCheckoutConfigured } from "@/lib/shopify/checkout";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ProductGallery } from "@/components/ProductGallery";
import { Accordion } from "@/components/Accordion";
import { ShopifyCheckoutButton } from "@/components/ShopifyCheckoutButton";

export function ProductPageClient({ scarf }: { scarf: Scarf }) {
  const checkoutConfigured = isCheckoutConfigured(scarf);

  return (
    <>
      <div className="product-wrap">
        <div className="product-gallery">
          <ProductGallery gradient={scarf.gradient} scarfName={scarf.name} />
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
            <ShopifyCheckoutButton
              slug={scarf.slug}
              label={`Collect — $${siteSettings.fullPrice}`}
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
                  "Dry clean recommended. Hand wash cold in gentle detergent if needed. Store rolled, not folded.",
              },
              {
                title: "Shipping",
                content: `Ships ${siteSettings.launchDate}. Complimentary tracked shipping within the US. International available. See Shipping & Returns for delivery and policy details.`,
              },
              { title: "About the Painting", content: scarf.painting },
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
