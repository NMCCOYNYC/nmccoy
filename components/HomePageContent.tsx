import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";

import { scarves } from "@/lib/products";
import { siteSettings } from "@/lib/site-settings";

import { Footer } from "@/components/Footer";

import { FeatureVideo } from "@/components/FeatureVideo";

import { HomeMotion } from "@/components/HomeMotion";

import { WorldSection } from "@/components/WorldSection";
import { getWorldImages } from "@/lib/world";

import { ScarfCarousel } from "@/components/ScarfCarousel";
import { HeroVideo } from "@/components/HeroVideo";

export function HomePageContent() {
  const world = getWorldImages();

  return (
    <HomeMotion>
      <section className="hero hero--editorial" data-hm-hero="">
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

      <section className="art-meant" aria-labelledby="art-meant-title">
        <div className="art-meant__inner" data-hm="stagger">
          <h2 id="art-meant-title" className="art-meant__title" data-hm="text">
            Art, Meant<br className="art-meant__break" /> to be Worn.
          </h2>
          <p
            className="art-meant__body"
            data-hm="text"
            style={{ "--hm-delay": "90ms" } as CSSProperties}
          >
            NMCCOY began with the belief that the things we choose to wear
            should feel personal. They can carry a sense of place, memory, and
            meaning, becoming part of the stories we hold onto and the objects
            we choose to keep close.
          </p>
        </div>
      </section>

      <FeatureVideo
        className="feature-video--home"
        eyebrow="The Film"
        title="Desert Illusions, in Motion"
        body="An intimate look at the memories, landscapes, and artistic roots behind the collection."
        videoUrl={siteSettings.featureVideoUrl}
        posterUrl={siteSettings.featureVideoPoster}
      />

      <WorldSection
        staticImage={world.staticImage}
        carouselImages={world.carouselImages}
      />

      <section className="collection-home" aria-labelledby="coll-intro-title">
        <div className="collection-home__intro">
          <div className="coll-intro" data-hm="stagger">
            <p className="eyebrow coll-intro__eyebrow" data-hm="text">
              Desert Illusions — Collection No. 1
            </p>
            <div className="coll-intro__left">
              <h2
                id="coll-intro-title"
                className="coll-intro__title"
                data-hm="text"
                style={{ "--hm-delay": "90ms" } as CSSProperties}
              >
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
              <p
                className="coll-intro__body"
                data-hm="text"
                style={{ "--hm-delay": "180ms" } as CSSProperties}
              >
                Six original artworks, translated into Italian silk and
                produced in small, numbered editions.
              </p>
              <Link
                href="/collection"
                className="btn--underline coll-intro__cta"
                data-hm="text"
                style={{ "--hm-delay": "260ms" } as CSSProperties}
              >
                View the Collection
              </Link>
            </div>
          </div>
        </div>

        <ScarfCarousel scarves={scarves} variant="home" />
      </section>

      <section className="process-band">
        <div className="process-band__img" data-hm="clip">
          <Image
            src="/process/from-painting-to-silk.jpg"
            alt="From painting to silk"
            fill
            className="process-band__img-fill"
            data-hm-depth=""
            style={{
              objectFit: "cover",
              objectPosition: "var(--process-band-object-pos)",
            }}
            sizes="(max-width: 960px) 100vw, 50vw"
          />
        </div>
        <div className="process-band__text" data-hm="stagger">
          <p
            className="eyebrow process-band__eyebrow"
            data-hm="text"
            style={{ "--hm-delay": "140ms" } as CSSProperties}
          >
            The Process
          </p>
          <h2
            className="process-band__title"
            data-hm="text"
            style={{ "--hm-delay": "220ms" } as CSSProperties}
          >
            From Painting<br className="process-band__break" /> to Silk.
          </h2>
          <p
            className="process-band__body"
            data-hm="text"
            style={{ "--hm-delay": "300ms" } as CSSProperties}
          >
            Each piece begins as an original painting before being carefully
            translated into silk in Italy.
          </p>
          <Link
            href="/process"
            className="btn--underline btn--underline-light"
            data-hm="text"
            style={{ "--hm-delay": "380ms" } as CSSProperties}
          >
            Discover the Process
          </Link>
        </div>
      </section>

      <Footer />
    </HomeMotion>
  );
}
