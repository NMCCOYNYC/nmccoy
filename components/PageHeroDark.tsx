export function PageHeroDark({
  eyebrow,
  title,
  subhead,
  description,
  style,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subhead?: string;
  description: string;
  style?: React.CSSProperties;
}) {
  return (
    <section className="page-hero-dark" style={style}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {subhead ? <p className="page-hero-dark__subhead">{subhead}</p> : null}
      <p className="page-hero-dark__body">{description}</p>
    </section>
  );
}
