import Link from "next/link";

import { scarves } from "@/lib/products";

import { Footer } from "@/components/Footer";

import { EmailCapture } from "@/components/EmailCapture";

import { FadeIn } from "@/components/FadeIn";

import { RevealParallax } from "@/components/RevealParallax";

import { ScarfCarousel } from "@/components/ScarfCarousel";

import { GradientFill } from "@/components/GradientFill";

export function HomePageContent() {
  return (
    <>
      <section className="hero hero--editorial">
        <GradientFill
          gradient="linear-gradient(160deg,#3D2B1F 0%,#6B4C34 30%,#8C603A 55%,#5C4A38 75%,#2A1A10 100%)"
          className="hero__media"
          aria-hidden={true}
        />
        <div className="hero__overlay" />
        <div className="hero__content hero__content--left">
          <p className="hero__kicker">Collection No. 1</p>
          <h1 className="hero__title">Desert Illusions</h1>
          <p className="hero__sub hero__sub--wide">
            Inspired by the shifting light of the American Southwest, Desert
            Illusions explores the space between what is seen and what is
            remembered. Six original artworks translated into limited-edition
            Italian silk.
          </p>
          <div className="hero__actions">
            <Link href="/collection" className="btn--underline btn--underline-light">
              Discover the Collection
            </Link>
          </div>
        </div>
      </section>

      <FadeIn variant="reveal">
        <section className="art-meant" aria-labelledby="art-meant-title">
          <div className="art-meant__inner">
            <h2 id="art-meant-title" className="art-meant__title">
              Art, Meant to be Worn.
            </h2>
            <p className="art-meant__body">
              NMCCOY is an art-led house rooted in the belief that the things we
              choose to keep should feel personal. Each collection begins with
              original artwork and carries its story from painting to textile,
              creating pieces designed to be worn, lived with, and kept.
            </p>
          </div>
        </section>
      </FadeIn>

      <section className="collection-home" aria-labelledby="coll-intro-title">
        <FadeIn variant="reveal">
          <div className="collection-home__intro">
            <div className="coll-intro">
              <p className="eyebrow coll-intro__eyebrow">
                Desert Illusions — Collection No. 1
              </p>
              <div className="coll-intro__left">
                <h2 id="coll-intro-title" className="coll-intro__title">
                  A few pieces,
                  <br />
                  caught in the
                  <br />
                  light.
                </h2>
              </div>
              <div className="coll-intro__right">
                <p className="coll-intro__body">
                  Six original artworks translated into limited-edition Italian
                  silk. Produced in small, numbered editions and never
                  reproduced in the same form again.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        <ScarfCarousel scarves={scarves} variant="home" />

        <FadeIn variant="fade" className="collection-home__cta">
          <Link href="/collection" className="btn--underline">
            View the Collection
          </Link>
        </FadeIn>
      </section>

      <section className="process-band">
        <RevealParallax className="process-band__img">
          <GradientFill
            gradient="linear-gradient(160deg,#8C603A 0%,#5C3A22 40%,#38271E 100%)"
            className="process-band__img-fill"
            aria-hidden={true}
          />
        </RevealParallax>
        <FadeIn variant="reveal" className="process-band__text">
          <p className="eyebrow process-band__eyebrow">The Process</p>
          <h2 className="process-band__title">
            From Painting
            <br />
            to Silk.
          </h2>
          <p className="process-band__italic">
            Brushstrokes become pattern. Light becomes memory.
            <br />
            Silk becomes a canvas meant to move with you.
          </p>
          <p className="process-band__body">
            Each NMCCOY piece begins not as a product, but as a moment. Painted
            by hand, guided by intuition, and shaped by time. What you keep is
            not replicated—it is translated. From artwork to object. From hand
            to heirloom.
          </p>
          <Link
            href="/process"
            className="btn--underline btn--underline-light"
          >
            Discover the Process
          </Link>
        </FadeIn>
      </section>

      <FadeIn variant="fade">
        <EmailCapture source="homepage" />
      </FadeIn>
      <Footer />
    </>
  );
}
