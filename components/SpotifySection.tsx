import { siteSettings } from "@/lib/site-settings";
import { TrackedLink } from "@/components/AnalyticsHelpers";

export function SpotifySection() {
  const playlistUrl = siteSettings.spotifyPlaylistUrl;

  return (
    <section className="spotify-section" aria-labelledby="spotify-title">
      <h2 id="spotify-title" className="spotify-section__title">
        The Sound of Desert Illusions
      </h2>
      <p className="spotify-section__body">
        A soundtrack curated to accompany the world behind the collection.
      </p>
      {playlistUrl ? (
        <TrackedLink
          href={playlistUrl}
          className="spotify-section__link"
          event="spotify"
          location="collection_page"
          external
        >
          Listen on Spotify →
        </TrackedLink>
      ) : (
        <span className="spotify-section__link spotify-section__link--pending">
          Listen on Spotify →
        </span>
      )}
    </section>
  );
}
