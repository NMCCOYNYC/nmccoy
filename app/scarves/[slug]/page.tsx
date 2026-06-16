import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScarfBySlug, scarves } from "@/lib/products";
import { ProductPageClient } from "@/components/ProductPageClient";
import { ProductTracker } from "@/components/ProductTracker";
import { pageMetadata } from "@/lib/seo";

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
    title: scarf.name,
    description: scarf.desc1.slice(0, 155),
    path: `/scarves/${slug}`,
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
      <ProductTracker slug={scarf.slug} name={scarf.name} />
      <ProductPageClient scarf={scarf} />
    </>
  );
}
