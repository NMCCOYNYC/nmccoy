"use client";

import { useEffect, useRef, useState } from "react";

type FeatureVideoProps = {
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  variant?: "light" | "dark";
  className?: string;
};

export function FeatureVideo({
  videoUrl,
  posterUrl,
  eyebrow,
  title,
  body,
  variant = "light",
  className = "",
}: FeatureVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    void video.play();
  }, [playing]);

  return (
    <section
      className={`feature-video feature-video--${variant}${className ? ` ${className}` : ""}`}
      aria-label={title || "Film"}
    >
      <div className="feature-video__inner">
        <div className="feature-video__copy">
          {eyebrow ? (
            <p className="eyebrow feature-video__eyebrow">{eyebrow}</p>
          ) : null}
          {title ? <h2 className="feature-video__title">{title}</h2> : null}
          {body ? <p className="feature-video__body">{body}</p> : null}
        </div>

        <div className="feature-video__frame">
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                className="feature-video__video"
                src={videoUrl}
                controls={playing}
                playsInline
                preload="metadata"
                poster={posterUrl}
                onEnded={() => setPlaying(false)}
              />
              {playing ? null : (
                <button
                  type="button"
                  className="feature-video__play-btn"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${title || "film"}`}
                >
                  <span className="feature-video__play" aria-hidden="true" />
                </button>
              )}
            </>
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
