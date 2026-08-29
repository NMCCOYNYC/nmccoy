export const FAVORITES_STORAGE_KEY = "nmccoy_favorites";

export function parseFavoriteSlugs(raw: string | null): string[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (slug): slug is string => typeof slug === "string" && slug.length > 0,
    );
  } catch {
    return [];
  }
}
