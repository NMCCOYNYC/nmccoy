import Link from "next/link";
import Image from "next/image";

import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";

import { Footer } from "@/components/Footer";

import { FeatureVideo } from "@/components/FeatureVideo";

import { FadeIn } from "@/components/FadeIn";

import { RevealParallax } from "@/components/RevealParallax";

import { WorldSection } from "@/components/WorldSection";

import { ScarfCarousel } from "@/components/ScarfCarousel";
import { HeroVideo } from "@/components/HeroVideo";

export function HomePageContent() {
  return (
    <>
      <section className="hero hero--editorial">
        <Image
          src="/home/desert-illusions-hero-desktop.jpg"
          alt="Desert Illusions silk scarf"
          fill
          className="hero__media hero__media--fallback hero__media--desktop"
          style={{
            objectFit: "cover",
            objectPosition: "var(--hero-object-pos)",
          }}
          sizes="100vw"
          priority
        />
        <Image
          src="/home/desert-illusions-hero-mobile.jpg"
          alt=""
          fill
          className="hero__media hero__media--fallback hero__media--mobile"
          style={{
            objectFit: "cover",
            objectPosition: "var(--hero-object-pos)",
          }}
          sizes="100vw"
          priority
        />
        <HeroVideo />
        <div className="hero__overlay" />
        <div className="hero__content hero__content--left">
          <p className="hero__kicker">Collection No. 1</p>
          <h1 className="hero__title">Desert Illusions</h1>
          <p className="hero__sub">
            Inspired by the shifting light of the American Southwest, Desert
            Illusions explores the space between what is seen and what is
            remembered.
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
              Art, Meant<br className="art-meant__break" /> to be Worn.
            </h2>
            <p className="art-meant__body">
              NMCCOY began with the belief that the things we choose to wear
              should feel personal. They can carry a sense of place, memory, and
              meaning, becoming part of the stories we hold onto and the objects
              we choose to keep close.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn variant="fade">
        <FeatureVideo
          className="feature-video--home"
          eyebrow="The Film"
          title="Desert Illusions, in Motion"
          body="An intimate look at the memories, landscapes, and artistic roots behind the collection."
          videoUrl={siteSettings.featureVideoUrl}
          posterUrl={siteSettings.featureVideoPoster}
        />
      </FadeIn>

      <FadeIn variant="reveal">
        <WorldSection />
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
                  <span className="coll-intro__line">A few pieces, </span>
                  <span className="coll-intro__line coll-intro__line--rest">
                    caught in the{" "}
                  </span>
                  <span className="coll-intro__line coll-intro__line--rest">
                    light.
                  </span>
                </h2>
              </div>
              <div className="coll-intro__right">
                <p className="coll-intro__body">
                  Six original artworks, translated into Italian silk and
                  produced in small, numbered editions.
                </p>
                <Link
                  href="/collection"
                  className="btn--underline coll-intro__cta"
                >
                  View the Collection
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        <ScarfCarousel scarves={scarves} variant="home" />
      </section>

      <section className="process-band">
        <RevealParallax className="process-band__img">
          <Image
            src="/process/from-painting-to-silk.jpg"
            alt="From painting to silk"
            fill
            className="process-band__img-fill"
            style={{
              objectFit: "cover",
              objectPosition: "var(--process-band-object-pos)",
            }}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </RevealParallax>
        <FadeIn variant="reveal" className="process-band__text">
          <p className="eyebrow process-band__eyebrow">The Process</p>
          <h2 className="process-band__title">
            From Painting<br className="process-band__break" /> to Silk.
          </h2>
          <p className="process-band__body">
            Each piece begins as an original painting before being carefully
            translated into silk in Italy.
          </p>
          <Link
            href="/process"
            className="btn--underline btn--underline-light"
          >
            Discover the Process
          </Link>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
