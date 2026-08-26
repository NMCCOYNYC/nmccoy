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
    process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL?.trim() ||
    "https://open.spotify.com/playlist/6h3xl0mu4FGbvMzioRz6A0",
  soundVideoUrl:
    process.env.NEXT_PUBLIC_SOUND_VIDEO_URL?.trim() || "/video/ink-bloom.mp4",
  featureVideoUrl:
    process.env.NEXT_PUBLIC_FEATURE_VIDEO_URL?.trim() ||
    "/video/desert-illusions-film.mp4",
  featureVideoPoster:
    process.env.NEXT_PUBLIC_FEATURE_VIDEO_POSTER?.trim() ||
    "/video/desert-illusions-film-poster.jpg",
};


