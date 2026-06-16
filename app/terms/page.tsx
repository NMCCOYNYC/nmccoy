import { siteSettings } from "@/lib/site-settings";
import { Footer } from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "NMCCOY terms and conditions for purchases on nmccoy.com.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <div className="policy-body">
        <p className="eyebrow">Legal</p>
        <h1>Terms & Conditions</h1>
        <p
          style={{
            fontFamily: "var(--font-util)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: "var(--taupe)",
          }}
        >
          Last updated: June 2026
        </p>
        <h2>1. About NMCCOY</h2>
        <p>
          NMCCOY is operated by Nichole McCoy, New York, USA. These Terms govern
          your use of nmccoy.com and purchases made through it.
        </p>
        <h2>2. Limited editions</h2>
        <p>
          Edition sizes are final. Once sold out, no additional units will be
          produced.
        </p>
        <h2>3. Purchases</h2>
        <p>
          Full payment is collected at checkout. Scarves ship{" "}
          {siteSettings.launchDate}. All sales are subject to availability.
        </p>
        <h2>4. Intellectual property</h2>
        <p>
          All artwork and content is the exclusive property of Nichole McCoy /
          NMCCOY. Purchase does not confer rights to the underlying artwork.
        </p>
        <h2>5. Governing law</h2>
        <p>
          Governed by the laws of New York, USA. Disputes in New York County courts.
        </p>
      </div>
      <Footer />
    </>
  );
}
