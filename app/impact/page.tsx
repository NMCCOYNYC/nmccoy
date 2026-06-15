import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/StatsBand";
import { PageHeroDark } from "@/components/PageHeroDark";

const partners = [
  {
    name: "Arizona Land Trust",
    description:
      "Permanent conservation of Arizona desert land. Over 400,000 acres protected since 1986.",
    color: "var(--aloe)",
  },
  {
    name: "Desert Botanical Garden Foundation",
    description: "Preservation and study of Sonoran Desert flora.",
    color: "var(--clay)",
  },
  {
    name: "Sky Island Alliance",
    description:
      "Conservation of the sky island ecosystems of the US-Mexico border region.",
    color: "var(--turq)",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageHeroDark
        eyebrow="Impact"
        title={
          <>
            Objects with
            <br />
            obligation
          </>
        }
        description="If a landscape is worth painting, it is worth protecting."
        style={{
          background: "linear-gradient(160deg,#74701E 0%,#38271E 100%)",
        }}
      />

      <div className="impact-nums">
        <div className="impact-num">
          <div className="impact-num__n">10%</div>
          <div className="impact-num__label">Of every sale donated</div>
        </div>
        <div className="impact-num">
          <div className="impact-num__n">AZ</div>
          <div className="impact-num__label">Desert conservation focus</div>
        </div>
        <div className="impact-num">
          <div className="impact-num__n">240</div>
          <div className="impact-num__label">Max scarves this collection</div>
        </div>
      </div>

      <div className="editorial-body">
        <h2>Why this matters</h2>
        <p>
          The Sonoran and Chihuahuan deserts are two of the most biodiverse arid
          ecosystems on Earth — and under sustained pressure. NMCCOY&apos;s paintings
          are made in this landscape. 10% of every sale goes toward organizations
          doing the work of preservation.
        </p>
      </div>

      <section className="partner-band">
        <div className="partner-band__inner">
          <p className="eyebrow">Partners</p>
          <h2>Organizations we support</h2>
          {partners.map((partner) => (
            <div className="partner-card" key={partner.name}>
              <div className="partner-icon">
                <div
                  className="partner-dot"
                  style={{ background: partner.color }}
                />
              </div>
              <div>
                <h3>{partner.name}</h3>
                <p>{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSection eyebrow="Every scarf funds the landscape it depicts" />
      <Footer />
    </>
  );
}
