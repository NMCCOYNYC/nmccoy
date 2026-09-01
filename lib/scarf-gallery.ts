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
  for (const ext of EXTS) {
    const found =
      publicUrlIfExists(`products/${slug}/${n}${ext}`) ||
      publicUrlIfExists(`products/${slug}-${n}${ext}`);
    if (found) return found;
  }
  return null;
}

export type ProductGallerySlide = {
  src: string | null;
};

/** Hero plus three 4:5 supporting slots. Missing files stay null for gradient placeholders. */
export function getProductGallerySlides(scarf: Scarf): ProductGallerySlide[] {
  return [
    { src: getScarfImages(scarf)[0] ?? null },
    ...SUPPORTING.map((n) => ({ src: findSupportingImage(scarf.slug, n) })),
  ];
}
