"use client";

import { useState } from "react";

type FeatureVideoProps = {
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  variant?: "light" | "dark";
};

export function FeatureVideo({
  videoUrl,
  posterUrl,
  eyebrow,
  title,
  body,
  variant = "light",
}: FeatureVideoProps) {
  const [playing, setPlaying] = useState(false);

  const showPoster = Boolean(posterUrl) && !playing;

  return (
    <section
      className={`feature-video feature-video--${variant}`}
      aria-label={title || "Film"}
    >
      <div className="feature-video__inner">
        {eyebrow ? (
          <p className="eyebrow feature-video__eyebrow">{eyebrow}</p>
        ) : null}
        {title ? <h2 className="feature-video__title">{title}</h2> : null}
        {body ? <p className="feature-video__body">{body}</p> : null}

        <div
          className="feature-video__frame"
          style={showPoster ? { backgroundImage: `url(${posterUrl})` } : undefined}
        >
          {videoUrl && playing ? (
            <video
              className="feature-video__video"
              src={videoUrl}
              controls
              autoPlay
              playsInline
              poster={posterUrl}
            />
          ) : videoUrl ? (
            <button
              type="button"
              className="feature-video__play-btn"
              onClick={() => setPlaying(true)}
              aria-label={`Play ${title || "film"}`}
            >
              <span className="feature-video__play" aria-hidden="true" />
            </button>
          ) : (
            <div className="feature-video__placeholder" aria-hidden="true">
              <span className="feature-video__play feature-video__play--muted" />
              <span className="feature-video__soon">Film coming soon</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
