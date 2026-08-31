import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { GradientFill } from "@/components/GradientFill";
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
        eyebrow="Impact"
        title="Impact"
        subhead="Every collection should leave something meaningful behind."
        liftOnScroll
        style={{
          background: "linear-gradient(160deg,#74701E 0%,#38271E 100%)",
        }}
      />

      <FadeIn variant="reveal">
        <section className="impact-philosophy">
          <p className="impact-philosophy__text">
            <span className="impact-philosophy__line">
              Each NMCCOY collection begins with a place, a story,{" "}
            </span>
            <span className="impact-philosophy__line">
              and a perspective. We believe giving back{" "}
            </span>
            <span className="impact-philosophy__line">
              should be part of that story, supporting the{" "}
            </span>
            <span className="impact-philosophy__line">
              communities and landscapes that inspire the work.
            </span>
          </p>
        </section>
      </FadeIn>

      <section className="impact-commitment">
        <FadeIn variant="reveal" className="impact-commitment__copy">
          <p className="eyebrow">Desert Illusions</p>
          <h2 className="impact-commitment__title">
            <span className="impact-commitment__line">Giving Back</span>
            <span className="impact-commitment__line">to the Southwest</span>
          </h2>
          <p className="impact-commitment__body">
            For Desert Illusions, NMCCOY will donate a portion of proceeds to
            support arts and culture in the American Southwest, with an inaugural
            contribution planned for the Heard Museum.
          </p>
        </FadeIn>
        <div className="impact-commitment__visual">
          <GradientFill
            gradient="linear-gradient(160deg,#74701E 0%,#8C603A 40%,#38271E 100%)"
            className="impact-commitment__fill"
            aria-hidden={true}
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
              behind each collection, with a focus on{" "}
            </span>
            <span className="impact-future__line">
              arts education, cultural preservation, and conservation.
            </span>
          </p>
        </FadeIn>
        <div className="impact-future__index">
          {FUTURE_FOCI.map((item, i) => (
            <FadeIn key={item.num} variant="rise" delay={0.08 * (i + 1)}>
              <div className="impact-future__item">
                <p className="impact-future__num">{item.num}</p>
                <h3 className="impact-future__label">{item.label}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
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
