import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";

const steps = [
  {
    num: "01",
    title: "Original ink painting",
    body: [
      "Everything begins with Nichole at her studio in Arizona, with ink and cold-press watercolor paper. Each painting is a finished work — unrepeatable, complete.",
      "The works range from 16×16 to 24×24 inches. None will be reproduced on silk more than 40 times.",
    ],
    visual: "Studio photography",
    bg: "linear-gradient(160deg,#F5EFE6,#D4B896)",
  },
  {
    num: "02",
    title: "High-resolution archiving",
    body: [
      "Each painting is professionally scanned at 1200 DPI — capturing paper texture, ink weight variation, and every decision that makes a painting feel alive.",
    ],
    visual: "Scanning process",
    bg: "linear-gradient(160deg,#E8E0D8,#C4B8A8)",
  },
  {
    num: "03",
    title: "Italian silk printing",
    body: [
      "100% silk twill, woven in Italy. Reactive dye bonds to the silk fibers. Edges are hand-rolled by artisans in the same mill — the detail that separates luxury from everything else.",
    ],
    visual: "Italy",
    bg: "linear-gradient(160deg,#D4C4B0,#A08060)",
  },
  {
    num: "04",
    title: "Numbering & packaging",
    body: [
      "Each scarf receives a handwritten edition number from Nichole. Every piece ships with a certificate of authenticity. Packaging is a single NMCCOY box with tissue.",
    ],
    visual: "Packaging",
    bg: "linear-gradient(160deg,#EDEBE9,#D4C4B0)",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeroDark
        eyebrow="How it's made"
        title={
          <>
            From ink
            <br />
            to silk
          </>
        }
        description="The NMCCOY process begins in the desert and ends in Italy — with nothing automated, nothing compromised."
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
        <CtaSection eyebrow="See the results" />
      </div>
      <Footer />
    </>
  );
}
