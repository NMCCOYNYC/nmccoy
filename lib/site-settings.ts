export const siteSettings = {
  collectionName: "Desert Illusions",
  launchDate: "September 13, 2026",
  fullPrice: 300,
  editionSize: 40,
  designCount: 6,
  contactEmail: "hello@nmccoynyc.com",
  instagramHandle: "@nmccoynyc",
  instagramUrl: "https://www.instagram.com/nmccoynyc",
  spotifyPlaylistUrl:
    process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL?.trim() || "",
  soundVideoUrl:
    process.env.NEXT_PUBLIC_SOUND_VIDEO_URL?.trim() || "/video/ink-bloom.mp4",
  featureVideoUrl: process.env.NEXT_PUBLIC_FEATURE_VIDEO_URL?.trim() || "",
  featureVideoPoster:
    process.env.NEXT_PUBLIC_FEATURE_VIDEO_POSTER?.trim() || "",
};

export function getNavCtaLabel() {
  return "Collection";
}
