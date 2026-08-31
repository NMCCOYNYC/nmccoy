import Image from "next/image";
import { HeroLoopVideo } from "@/components/HeroLoopVideo";
import { HeroScrollLift } from "@/components/HeroScrollLift";

export function PageHeroDark({
  eyebrow,
  title,
  subhead,
  description,
  imageSrc,
  imageAlt,
  videoSrc,
  className = "",
  style,
  liftOnScroll = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  className?: string;
  style?: React.CSSProperties;
  liftOnScroll?: boolean;
}) {
  const content = (
    <>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {subhead ? <p className="page-hero-dark__subhead">{subhead}</p> : null}
      {description ? <p className="page-hero-dark__body">{description}</p> : null}
    </>
  );

  return (
    <section
      className={`page-hero-dark${imageSrc ? " page-hero-dark--image" : ""}${videoSrc ? " page-hero-dark--video" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {videoSrc ? (
        <>
          <HeroLoopVideo
            src={videoSrc}
            className="page-hero-dark__media page-hero-dark__video"
          />
          <div className="page-hero-dark__overlay" aria-hidden="true" />
        </>
      ) : imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt || ""}
            fill
            className="page-hero-dark__media"
            style={{
              objectFit: "cover",
              objectPosition: "var(--page-hero-object-pos)",
            }}
            sizes="100vw"
            priority
          />
          <div className="page-hero-dark__overlay" aria-hidden="true" />
        </>
      ) : null}
      <div className="page-hero-dark__content">
        {liftOnScroll ? <HeroScrollLift>{content}</HeroScrollLift> : content}
      </div>
    </section>
  );
}
