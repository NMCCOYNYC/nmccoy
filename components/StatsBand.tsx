import Link from "next/link";
import { siteSettings, isPreorderMode } from "@/lib/site-settings";

export function StatsBand() {
  const stats = [
    { num: String(siteSettings.designCount), label: "Original Designs" },
    { num: String(siteSettings.editionSize), label: "Pieces Per Edition" },
    { num: "90×90", label: "Silk Twill, cm" },
    { num: "IT", label: "Made in Italy" },
    { num: `$${siteSettings.fullPrice}`, label: "Per Scarf" },
  ];

  return (
    <div className="stats-band">
      {stats.map((stat, i) => (
        <div key={stat.label} style={{ display: "contents" }}>
          {i > 0 && <div className="stat-divider" />}
          <div className="stat-item">
            <div className="stat-item__num">{stat.num}</div>
            <div className="stat-item__label">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CtaSection({
  eyebrow,
  title,
  href = "/collection",
  buttonLabel = "View Collection",
}: {
  eyebrow: string;
  title?: string;
  href?: string;
  buttonLabel?: string;
}) {
  const defaultTitle = isPreorderMode()
    ? `${siteSettings.collectionName} — pre-order open`
    : `${siteSettings.collectionName} — now available`;

  return (
    <div className="cta-section">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title || defaultTitle}</h2>
      <Link href={href} className="btn btn--dark">
        {buttonLabel}
      </Link>
    </div>
  );
}
