import fs from "fs";
import path from "path";
import { getScarfImages, type Scarf } from "@/lib/products";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const SUPPORTING = ["02", "03", "04"] as const;
const EXTS = [".jpg", ".jpeg", ".webp", ".png"] as const;

function publicUrlIfExists(relPath: string): string | null {
  if (!fs.existsSync(path.join(PUBLIC_DIR, relPath))) return null;
  return `/${relPath}`;
}

function findSupportingImage(slug: string, n: string): string | null {
  const names = n.startsWith("0") ? [n, n.replace(/^0+/, "")] : [n];
  for (const name of names) {
    for (const ext of EXTS) {
      const found =
        publicUrlIfExists(`products/${slug}/${name}${ext}`) ||
        publicUrlIfExists(`products/${slug}-${name}${ext}`);
      if (found) return found;
    }
  }
  return null;
}

export type ProductGallerySlide = {
  src: string | null;
};

/** Hero plus three 2:3 supporting slots. Missing files stay null for gradient placeholders. */
export function getProductGallerySlides(scarf: Scarf): ProductGallerySlide[] {
  const listed = getScarfImages(scarf);
  return [
    { src: listed[0] ?? null },
    ...SUPPORTING.map((n, i) => ({
      src: listed[i + 1] ?? findSupportingImage(scarf.slug, n),
    })),
  ];
}
