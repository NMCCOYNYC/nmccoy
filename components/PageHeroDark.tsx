import Image from "next/image";
import { HeroScrollLift } from "@/components/HeroScrollLift";

export function PageHeroDark({
  eyebrow,
  title,
  subhead,
  description,
  imageSrc,
  imageAlt,
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
      className={`page-hero-dark${imageSrc ? " page-hero-dark--image" : ""}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {imageSrc ? (
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
