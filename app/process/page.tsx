import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Process",
  description:
    "From original ink painting to Italian silk — how NMCCOY artworks are preserved, translated, and produced.",
  path: "/process",
});

const steps = [
  {
    num: "01",
    title: "Original ink painting",
    body: [
      "Every NMCCOY collection begins with an original ink painting. Each work is first realized as a complete artwork before being translated into silk.",
      "Painted by hand on cold-press watercolor paper, no two marks are ever exactly alike. The resulting artworks are produced in small, numbered editions and will never be reproduced again in the same form.",
    ],
    visual: "Studio photography",
    bg: "linear-gradient(160deg,#F5EFE6,#D4B896)",
  },
  {
    num: "02",
    title: "High-resolution archiving",
    body: [
      "Each painting is digitized at high resolution, capturing paper texture, ink weight, and the surface details of the original work.",
      "This archive becomes the foundation for translation to silk — faithful to the painting, not reinterpreted.",
    ],
    visual: "Archiving process",
    bg: "linear-gradient(160deg,#E8E0D8,#C4B8A8)",
  },
  {
    num: "03",
    title: "Italian silk printing",
    body: [
      "Printed on 100% silk twill in Italy, in small batches. Reactive dyes bond to the fibers while preserving depth and detail from the source artwork.",
      "Edges are hand-rolled at the mill — a finishing detail that marks the difference between production and intention.",
    ],
    visual: "Italy",
    bg: "linear-gradient(160deg,#D4C4B0,#A08060)",
  },
  {
    num: "04",
    title: "Numbering & packaging",
    body: [
      "Each piece is numbered by hand and accompanied by a certificate of authenticity.",
      "Every scarf ships in a single NMCCOY box with tissue — prepared with the same care given to the work itself.",
    ],
    visual: "Packaging",
    bg: "linear-gradient(160deg,#EDEBE9,#D4C4B0)",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeroDark
        eyebrow="The Process"
        title="From Painting to Silk."
        subhead="Original artworks, translated into textile."
        description="Each NMCCOY piece begins as a hand-painted work on paper. Through a careful process of preservation and production, the artwork is transformed into silk—retaining the nuances, textures, and imperfections that make it uniquely its own."
      />

      <div className="steps-wrap">
        {steps.map((step) => (
          <div className="step" key={step.num}>
            <div className="step__num-col">
              <span className="step__num">{step.num}</span>
            </div>
            <div className="step__text">
              <h2 className="step__title">{step.title}</h2>
              <div className="step__body">
                {step.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="step__visual" style={{ background: step.bg }}>
              {step.visual}
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--white)" }}>
        <CtaSection eyebrow="The Collection" />
      </div>
      <Footer />
    </>
  );
}
