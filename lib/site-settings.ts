export const siteSettings = {
  collectionName: "Desert Illusions",
  launchDate: "August 4, 2026",
  fullPrice: 300,
  editionSize: 40,
  designCount: 6,
  contactEmail: "hello@nmccoynyc.com",
  instagramHandle: "@nmccoynyc",
  instagramUrl: "https://www.instagram.com/nmccoynyc",
  spotifyPlaylistUrl:
    process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL?.trim() || "",
};

export function getNavCtaLabel() {
  return "Collection";
}
