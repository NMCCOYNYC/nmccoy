import Image from "next/image";

export function PageHeroDark({
  eyebrow,
  title,
  subhead,
  description,
  imageSrc,
  imageAlt,
  className = "",
  style,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subhead?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
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
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {subhead ? <p className="page-hero-dark__subhead">{subhead}</p> : null}
        {description ? <p className="page-hero-dark__body">{description}</p> : null}
      </div>
    </section>
  );
}
