import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScarfBySlug, scarves } from "@/lib/products";
import { getProductGallerySlides } from "@/lib/scarf-gallery";
import { JsonLd } from "@/components/JsonLd";
import { ProductPageClient } from "@/components/ProductPageClient";
import { ProductTracker } from "@/components/ProductTracker";
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return scarves.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const scarf = getScarfBySlug(slug);

  if (!scarf) {
    return {};
  }

  return pageMetadata({
    title: `${scarf.name} — Limited-Edition Italian Silk`,
    description: `${scarf.name} by NMCCOY. ${scarf.desc2} ${scarf.painting}`,
    path: `/scarves/${slug}`,
    image: scarf.images?.[0],
    imageAlt: `${scarf.name} silk scarf`,
  });
}

export default async function ScarfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scarf = getScarfBySlug(slug);
  if (!scarf) notFound();

  return (
    <>
      <JsonLd data={productJsonLd(scarf)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collection", path: "/collection" },
          { name: scarf.name, path: `/scarves/${scarf.slug}` },
        ])}
      />
      <ProductTracker slug={scarf.slug} name={scarf.name} />
      <ProductPageClient
        scarf={scarf}
        slides={getProductGallerySlides(scarf)}
      />
    </>
  );
}
