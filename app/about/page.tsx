import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/StatsBand";
import { GradientFill } from "@/components/GradientFill";

export default function AboutPage() {
  return (
    <>
      <section className="process-band" style={{ minHeight: "70vh" }}>
        <div
          className="process-band__img"
          style={{
            paddingTop: "70px",
            background: "linear-gradient(160deg,#C4A882 0%,#8C603A 40%,#38271E 100%)",
          }}
        />
        <div
          className="process-band__text"
          style={{ paddingTop: "clamp(6rem,10vw,10rem)" }}
        >
          <p className="eyebrow process-band__eyebrow">Our Story</p>
          <h2 className="process-band__title">
            Art first.
            <br />
            Always.
          </h2>
          <p className="process-band__body">
            NMCCOY began not with a product, but with a painting — and the belief
            that the painting should never be secondary to what it becomes.
          </p>
        </div>
      </section>

      <div className="editorial-body">
        <h2>The question that started everything</h2>
        <p>
          In 2024, Nichole McCoy was deep in her ink painting practice when someone
          asked what she was going to do with all her work. The honest answer was:
          keep painting. But the question stayed.
        </p>
        <div className="pull-quote">
          &ldquo;I didn&apos;t want to license my work to a brand. I wanted to build
          something where the work was the brand.&rdquo;
        </div>
        <h2>Why silk. Why Italy.</h2>
        <p>
          Silk is the only material that receives ink translation with the fidelity
          the paintings demand. The sheen changes with light the way the desert does.
          Italian production has a different relationship with quality than any
          alternative.
        </p>
        <h2>Desert as subject and studio</h2>
        <p>
          Nichole works from Arizona, where the light is a daily event worth
          documenting. The desert&apos;s relationship to color — the way distance
          becomes visible, the way shadows tell time — is the subject of every
          painting in this collection.
        </p>
      </div>

      <section className="values-strip">
        <div className="values-strip__inner">
          <p className="eyebrow">What we stand for</p>
          <h2>The principles that shape every decision</h2>
          <div className="values-grid">
            <div>
              <h3 className="value-title">Art is primary</h3>
              <p className="value-body">
                Every object begins with an original painting. The scarf exists
                because the painting exists.
              </p>
            </div>
            <div>
              <h3 className="value-title">Honest limitation</h3>
              <p className="value-body">
                40 pieces per design is a real constraint. When an edition closes,
                it is closed.
              </p>
            </div>
            <div>
              <h3 className="value-title">Material integrity</h3>
              <p className="value-body">
                Italian silk twill is not the affordable option. It is the correct
                option.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-band">
        <div className="story-band__text">
          <p className="eyebrow">The Founder</p>
          <h2 className="story-band__title">Nichole McCoy</h2>
          <p className="story-band__body">
            A painter based in Arizona whose practice centers on ink on paper. She
            founded NMCCOY not as a departure from painting but as an extension of
            it.
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--clay)" }}>
            Nichole McCoy
          </p>
        </div>
        <div
          className="story-band__img"
          style={{ background: "linear-gradient(145deg,#B5A090,#796D61)" }}
        >
          <GradientFill
            gradient="linear-gradient(145deg,#B5A090,#796D61)"
            className="story-band__img-fill"
          />
        </div>
      </section>

      <CtaSection eyebrow="See the work" />
      <Footer />
    </>
  );
}
