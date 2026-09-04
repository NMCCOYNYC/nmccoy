import fs from "fs";
import path from "path";

export type WorldImage = {
  src: string;
  alt: string;
};

const WORLD_DIR = path.join(process.cwd(), "public", "home", "world");
const IMAGE_EXT = /\.(jpe?g|webp|png)$/i;
const STATIC_NAME = /^(static|left)\.(jpe?g|webp|png)$/i;
const CAROUSEL_NAME = /^(\d{2})(?:[-_].+)?\.(jpe?g|webp|png)$/i;

const FALLBACK_STATIC: WorldImage = {
  src: "/home/desert-illusions-hero-mobile.jpg",
  alt: "Desert Illusions campaign",
};

const FALLBACK_CAROUSEL: WorldImage[] = [
  { src: "/products/wild-mirage.jpg", alt: "Wild Mirage" },
  { src: "/products/hazy-mesa.jpg", alt: "Hazy Mesa" },
  { src: "/products/dusty-bloom.jpg", alt: "Dusty Bloom" },
  { src: "/products/carried-light.jpg", alt: "Carried Light" },
  { src: "/products/sundance.jpg", alt: "Sundance" },
  { src: "/products/indigo-dream.jpg", alt: "Indigo Dream" },
];

function altFromFilename(filename: string) {
  const base = filename.replace(/\.[^.]+$/, "");
  if (STATIC_NAME.test(filename)) return "Desert Illusions";
  const label = base
    .replace(/^\d{2}[-_]?/, "")
    .replace(/[-_]+/g, " ")
    .trim();
  if (!label) return "Desert Illusions campaign";
  return label.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getWorldImages(): {
  staticImage: WorldImage;
  carouselImages: WorldImage[];
} {
  if (!fs.existsSync(WORLD_DIR)) {
    return {
      staticImage: FALLBACK_STATIC,
      carouselImages: FALLBACK_CAROUSEL,
    };
  }

  const files = fs.readdirSync(WORLD_DIR).filter((file) => IMAGE_EXT.test(file));
  const staticFile = files.find((file) => STATIC_NAME.test(file));
  const carouselFiles = files
    .filter((file) => CAROUSEL_NAME.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return {
    staticImage: staticFile
      ? {
          src: `/home/world/${staticFile}`,
          alt: altFromFilename(staticFile),
        }
      : FALLBACK_STATIC,
    carouselImages: carouselFiles.length
      ? carouselFiles.map((file) => ({
          src: `/home/world/${file}`,
          alt: altFromFilename(file),
        }))
      : FALLBACK_CAROUSEL,
  };
}
