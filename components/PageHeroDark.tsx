export function PageHeroDark({
  eyebrow,
  title,
  description,
  style,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  style?: React.CSSProperties;
}) {
  return (
    <section className="page-hero-dark" style={style}>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
