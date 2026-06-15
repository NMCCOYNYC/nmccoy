export type SiteMode = "preorder" | "launch";

export const siteSettings = {
  mode: (process.env.NEXT_PUBLIC_SITE_MODE as SiteMode) || "preorder",
  collectionName: "Desert Illusions",
  launchDate: "August 4, 2026",
  refundDeadline: "July 1, 2026",
  depositAmount: 150,
  fullPrice: 300,
  editionSize: 40,
  designCount: 6,
};

export function isPreorderMode() {
  return siteSettings.mode === "preorder";
}

export function getNavCtaLabel() {
  return isPreorderMode() ? "Reserve" : "Shop";
}

export function getMarqueeItems() {
  const base = [
    siteSettings.collectionName,
    "Original Ink Paintings",
    "100% Silk Twill",
    "Made in Italy",
    `Edition of ${siteSettings.editionSize}`,
  ];

  if (isPreorderMode()) {
    base.push("Pre-Order Open", siteSettings.launchDate);
  } else {
    base.push("Now Available");
  }

  return base;
}
