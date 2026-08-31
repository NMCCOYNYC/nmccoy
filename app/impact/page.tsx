import Image from "next/image";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Impact",
  description:
    "Each NMCCOY collection begins with a place. Desert Illusions will donate a portion of proceeds to support arts and culture in the American Southwest.",
  path: "/impact",
});

const FUTURE_FOCI = [
  { num: "01", label: "Arts Education" },
  { num: "02", label: "Cultural Preservation" },
  { num: "03", label: "Conservation" },
] as const;

export default function ImpactPage() {
  return (
    <>
      <PageHeroDark
        className="page-hero-dark--impact"
        title="Impact"
        subhead="Every collection should leave something meaningful behind."
        videoSrc="/impact/arizona-roads.mp4"
        liftOnScroll
      />

      <section className="impact-philosophy">
        <FadeIn variant="reveal">
          <p className="impact-philosophy__text">
            <span className="impact-philosophy__line">
              Each NMCCOY collection begins with a place, a story, and a perspective.{" "}
            </span>
            <span className="impact-philosophy__line">
              We believe giving back should extend that connection, supporting{" "}
            </span>
            <span className="impact-philosophy__line">
              the communities and landscapes that inspire the work.
            </span>
          </p>
        </FadeIn>
      </section>

      <section className="impact-commitment">
        <div className="impact-commitment__copy">
          <FadeIn variant="reveal" className="impact-commitment__block">
            <p className="eyebrow">Desert Illusions</p>
            <h2 className="impact-commitment__title">
              <span className="impact-commitment__line">Giving Back to</span>
              <span className="impact-commitment__line">the Southwest</span>
            </h2>
            <p className="impact-commitment__body">
              For Desert Illusions, NMCCOY will donate a portion of proceeds to
              support arts and culture in the American Southwest, with an inaugural
              contribution planned for the Heard Museum. The museum&apos;s
              commitment to advancing American Indian art, culture, and creative
              expression reflects the spirit of the collection and the region that
              inspired it.
            </p>
          </FadeIn>
        </div>
        <div className="impact-commitment__visual">
          <Image
            src="/impact/giving-back-southwest.jpg"
            alt="Red rock formations in the American Southwest at golden hour"
            fill
            className="impact-commitment__fill"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="impact-future">
        <FadeIn variant="reveal" className="impact-future__intro">
          <p className="eyebrow">From Collection to Collection</p>
          <p className="impact-future__statement">
            <span className="impact-future__line">
              As NMCCOY evolves, giving will follow the stories{" "}
            </span>
            <span className="impact-future__line">
              behind each collection, with a focus on arts education,{" "}
            </span>
            <span className="impact-future__line">
              cultural preservation, and conservation.
            </span>
          </p>
        </FadeIn>
        <div className="impact-future__index">
          {FUTURE_FOCI.map((item, i) => (
            <FadeIn key={item.num} variant="rise" delay={0.12 + i * 0.1}>
              <div className="impact-future__item">
                <p className="impact-future__num">{item.num}</p>
                <h3 className="impact-future__label">{item.label}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="impact-portrait">
        <FadeIn variant="rise">
          <figure className="impact-portrait__figure">
            <div className="impact-portrait__media">
              <Image
                src="/impact/hubbell-weavers.jpg"
                alt="Diné weavers at a loom at Hubbell Trading Post National Historic Site, Arizona"
                fill
                className="impact-portrait__fill"
                style={{ objectFit: "cover", objectPosition: "center center" }}
                sizes="(max-width: 960px) 80vw, 54vw"
              />
            </div>
            <figcaption className="impact-portrait__caption">
              <span className="impact-portrait__credit">
                Diné weavers at Hubbell Trading Post National Historic Site,
                Arizona
              </span>
              <span className="impact-portrait__source">
                National Park Service
              </span>
            </figcaption>
          </figure>
        </FadeIn>
      </section>

      <CtaSection
        className="cta-section--quiet"
        eyebrow="Collection No. 1"
        title={
          <>
            Enter the World of
            <br />
            Desert Illusions
          </>
        }
      />
      <Footer />
    </>
  );
}
