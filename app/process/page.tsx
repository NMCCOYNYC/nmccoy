import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";
import { FeatureVideo } from "@/components/FeatureVideo";
import { ProcessChapters, type ProcessStep } from "@/components/ProcessChapters";
import { siteSettings } from "@/lib/site-settings";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Process",
  description:
    "From original ink painting to Italian silk — how NMCCOY artworks are preserved, translated, and produced.",
  path: "/process",
});

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Original ink painting",
    bleed: ["Original", "ink painting"],
    body: [
      "Every NMCCOY collection begins with an original ink painting. Each work is first realized as a complete artwork before being translated into silk.",
      "Painted by hand on cold-press watercolor paper, no two marks are ever exactly alike. The resulting artworks are produced in small, numbered editions and will never be reproduced again in the same form.",
    ],
    visual: "Studio photography",
    image: "/process/step-01-studio.jpg",
  },
  {
    num: "02",
    title: "High-resolution archiving",
    bleed: ["High-resolution", "archiving"],
    body: [
      "Each painting is digitized at high resolution, capturing paper texture, ink weight, and the surface details of the original work.",
      "This archive becomes the foundation for translation to silk — faithful to the painting, not reinterpreted.",
    ],
    visual: "Archiving process",
    image: "/process/step-02-archiving.jpg",
  },
  {
    num: "03",
    title: "Italian silk printing",
    bleed: ["Italian silk", "printing"],
    body: [
      "Printed on 100% silk twill in Italy, in small batches. Reactive dyes bond to the fibers while preserving depth and detail from the source artwork.",
      "Edges are hand-rolled at the mill — a finishing detail that marks the difference between production and intention.",
    ],
    visual: "Italy",
    image: "/process/step-03-italy.jpg",
  },
  {
    num: "04",
    title: "Numbering & packaging",
    bleed: ["Numbering &", "packaging"],
    body: [
      "Each piece is numbered by hand and accompanied by a certificate of authenticity.",
      "Every scarf ships in a single NMCCOY box with tissue — prepared with the same care given to the work itself.",
    ],
    visual: "Packaging",
    image: "/process/step-04-packaging.jpg",
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
        imageSrc="/process/from-painting-to-silk-hero.jpg"
        imageAlt="From painting to silk"
      />

      <FeatureVideo
        eyebrow="The Film"
        title="Where Desert Illusions Began"
        body="Founder Nichole McCoy reflects on the Arizona landscape, memories of the American West, and the personal history that shaped the collection."
        videoUrl={siteSettings.featureVideoUrl}
        posterUrl={siteSettings.featureVideoPoster}
      />

      <ProcessChapters steps={steps} />

      <div style={{ background: "var(--white)" }}>
        <CtaSection eyebrow="The Collection" />
      </div>
      <Footer />
    </>
  );
}
