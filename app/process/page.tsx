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
    "From original ink painting to Italian silk — how NMCCOY artworks move from paper to finished scarf.",
  path: "/process",
});

const steps: ProcessStep[] = [
  {
    num: "01",
    title: "Original ink painting",
    bleed: ["Original", "ink painting"],
    body: [
      "Every collection begins with an original ink painting, created by hand on cold-press watercolor paper. Each work is completed as an artwork in its own right, with every mark reflecting the hand that made it.",
    ],
    visual: "Studio photography",
    image: "/process/step-01-studio.jpg",
  },
  {
    num: "02",
    title: "High-resolution archiving",
    bleed: ["High-resolution", "archiving"],
    body: [
      "Each painting is digitized at high resolution, preserving the nuances of the original before it moves into textile.",
    ],
    visual: "Archiving process",
    image: "/process/step-02-archiving.jpg",
  },
  {
    num: "03",
    title: "Italian silk printing",
    bleed: ["Italian silk", "printing"],
    body: [
      "In Italy, the artwork is translated onto 100% silk twill using reactive dyes and finished with hand-rolled edges. The painting takes on a new form while retaining the qualities of the original.",
    ],
    visual: "Italy",
    image: "/process/step-03-italy.jpg",
  },
  {
    num: "04",
    title: "Numbering & packaging",
    bleed: ["Numbering &", "packaging"],
    body: [
      "Each scarf is individually numbered and presented in an NMCCOY box with its edition card, completing the journey from original artwork to finished piece.",
    ],
    visual: "Packaging",
    image: "/process/step-04-packaging.jpg",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeroDark
        className="page-hero-dark--process"
        eyebrow="The Process"
        title={
          <>
            From Painting
            <br className="page-hero-dark__break" /> to Silk.
          </>
        }
        subhead="Preserving the character of the original artwork as it moves from paper to silk."
        imageSrc="/process/from-painting-to-silk-hero.jpg"
        imageAlt="From painting to silk"
      />

      <FeatureVideo
        className="feature-video--process"
        eyebrow="The Film"
        title="Where Desert Illusions Began"
        body="Nichole McCoy reflects on the Arizona landscape and the personal experiences that shaped the collection."
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
