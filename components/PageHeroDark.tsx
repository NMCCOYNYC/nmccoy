import Image from "next/image";

export function PageHeroDark({
  eyebrow,
  title,
  subhead,
  description,
  imageSrc,
  imageAlt,
  style,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subhead?: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      className={`page-hero-dark${imageSrc ? " page-hero-dark--image" : ""}`}
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
        <p className="page-hero-dark__body">{description}</p>
      </div>
    </section>
  );
}
