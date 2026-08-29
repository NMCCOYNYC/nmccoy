import { scarves, type Scarf } from "@/lib/products";

export function searchScarves(query: string): Scarf[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return scarves.filter((scarf) => {
    const haystack = [
      scarf.name,
      scarf.slug,
      scarf.number,
      scarf.numberLabel,
      scarf.desc1,
      scarf.desc2,
      scarf.painting,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(needle);
  });
}
