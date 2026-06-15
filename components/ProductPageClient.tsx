"use client";

import { useState } from "react";
import Link from "next/link";
import type { Scarf } from "@/lib/products";
import { isPreorderMode, siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { ProductGallery } from "@/components/ProductGallery";
import { Accordion } from "@/components/Accordion";
import { ReserveModal } from "@/components/ReserveModal";

export function ProductPageClient({ scarf }: { scarf: Scarf }) {
  const [modalOpen, setModalOpen] = useState(false);
  const preorder = isPreorderMode();

  return (
    <>
      <div className="product-wrap">
        <div className="product-gallery">
          <ProductGallery gradient={scarf.gradient} />
        </div>
        <div className="product-info">
          <Link href="/collection" className="product-bc">
            ← Collection
          </Link>
          <p className="product-no">{scarf.numberLabel}</p>
          <h1 className="product-title">{scarf.name}</h1>
          <p className="product-price">${siteSettings.fullPrice} USD</p>
          <p className="product-edition">
            Limited Edition · {siteSettings.editionSize} Pieces ·{" "}
            {preorder ? "Pre-order Open" : "Now Available"}
          </p>
          <div className="product-divider" />
          <p className="product-desc">{scarf.desc1}</p>
          <p className="product-desc">{scarf.desc2}</p>
          <div className="product-cta">
            {preorder ? (
              <>
                <button
                  type="button"
                  className="btn btn--dark"
                  style={{ textAlign: "center", width: "100%", padding: "1.1rem" }}
                  onClick={() => setModalOpen(true)}
                >
                  Reserve — ${siteSettings.depositAmount} Deposit
                </button>
                <Link
                  href="/collection"
                  className="btn btn--outline"
                  style={{ textAlign: "center", width: "100%", padding: "1.1rem" }}
                >
                  View Full Collection
                </Link>
                <p className="deposit-note">
                  50% deposit · Balance due at ship · Refundable until{" "}
                  {siteSettings.refundDeadline.split(" ")[0]}
                </p>
              </>
            ) : (
              <button
                type="button"
                className="btn btn--dark"
                style={{ textAlign: "center", width: "100%", padding: "1.1rem" }}
                disabled={!scarf.shopifyFullUrl}
              >
                {scarf.shopifyFullUrl
                  ? `Purchase — $${siteSettings.fullPrice}`
                  : `Shop coming soon — $${siteSettings.fullPrice}`}
              </button>
            )}
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
                content: `Ships ${siteSettings.launchDate}. Complimentary tracked shipping within the US. International available.`,
              },
              { title: "About the Painting", content: scarf.painting },
            ]}
          />
        </div>
      </div>
      <Footer />
      <ReserveModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        scarfName={scarf.name}
        checkoutUrl={scarf.shopifyDepositUrl}
      />
    </>
  );
}
