import { notFound } from "next/navigation";
import { getScarfBySlug, scarves } from "@/lib/products";
import { ProductPageClient } from "@/components/ProductPageClient";

export function generateStaticParams() {
  return scarves.map((s) => ({ slug: s.slug }));
}

export default async function ScarfPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const scarf = getScarfBySlug(slug);
  if (!scarf) notFound();
  return <ProductPageClient scarf={scarf} />;
}
