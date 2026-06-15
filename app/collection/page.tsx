import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { ScarfCard } from "@/components/ScarfCard";

export default function CollectionPage() {
  const delays = [0, 0.08, 0.16, 0.04, 0.12, 0.2];

  return (
    <>
      <FadeIn className="coll-hero">
        <p className="eyebrow">Debut Collection · 2026</p>
        <h1>
          Desert
          <br />
          Illusions
        </h1>
        <p>
          Six original ink paintings translated to 100% Italian silk twill.
          Edition of {siteSettings.editionSize} per design.
        </p>
        <div className="coll-meta">
          <div>
            <div className="meta-label">Fabric</div>
            <div className="meta-val">100% Silk Twill</div>
          </div>
          <div>
            <div className="meta-label">Dimensions</div>
            <div className="meta-val">90 × 90 cm</div>
          </div>
          <div>
            <div className="meta-label">Made in</div>
            <div className="meta-val">Italy</div>
          </div>
          <div>
            <div className="meta-label">Edition</div>
            <div className="meta-val">{siteSettings.editionSize} per design</div>
          </div>
          <div>
            <div className="meta-label">Price</div>
            <div className="meta-val">${siteSettings.fullPrice} USD</div>
          </div>
        </div>
      </FadeIn>

      <div className="scarves-grid">
        {scarves.map((scarf, i) => (
          <ScarfCard key={scarf.slug} scarf={scarf} delay={delays[i]} />
        ))}
      </div>

      <div
        style={{
          padding: "2.5rem clamp(1.5rem,4vw,4rem)",
          textAlign: "center",
          borderTop: "1px solid rgba(56,39,30,0.07)",
        }}
      >
        <p className="eyebrow" style={{ marginBottom: "0.8rem" }}>
          Pre-order note
        </p>
        <p
          style={{
            color: "var(--taupe)",
            fontSize: "13px",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.8,
          }}
        >
          50% deposit reserves your piece. Balance due at ship{" "}
          {siteSettings.launchDate}. Fully refundable until{" "}
          {siteSettings.refundDeadline}.
        </p>
      </div>

      <Footer />
    </>
  );
}
