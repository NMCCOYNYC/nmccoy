"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type FeatureVideoProps = {
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  variant?: "light" | "dark";
  className?: string;
  label?: string;
};

export function FeatureVideo({
  videoUrl,
  posterUrl,
  eyebrow,
  title,
  body,
  variant = "light",
  className = "",
  label,
}: FeatureVideoProps) {
  const [playing, setPlaying] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = !soundOn;
    video.volume = 1;
    void video.play();
  }, [playing, soundOn]);

  function toggleSound() {
    const video = videoRef.current;
    const next = !soundOn;
    if (video) {
      video.volume = 1;
      video.muted = !next;
    }
    setSoundOn(next);
  }

  const showCopy = Boolean(eyebrow || title || body);
  const homeMotion = className.includes("feature-video--home");

  return (
    <section
      className={`feature-video feature-video--${variant}${className ? ` ${className}` : ""}`}
      aria-label={title || label || "Film"}
    >
      <div className="feature-video__inner">
        {showCopy ? (
          <div
            className="feature-video__copy"
            {...(homeMotion ? { "data-hm": "stagger" } : {})}
          >
            {eyebrow ? (
              <p
                className="eyebrow feature-video__eyebrow"
                {...(homeMotion ? { "data-hm": "text" } : {})}
              >
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2
                className="feature-video__title"
                {...(homeMotion
                  ? {
                      "data-hm": "text",
                      style: { "--hm-delay": "90ms" } as CSSProperties,
                    }
                  : {})}
              >
                {title}
              </h2>
            ) : null}
            {body ? (
              <p
                className="feature-video__body"
                {...(homeMotion
                  ? {
                      "data-hm": "text",
                      style: { "--hm-delay": "180ms" } as CSSProperties,
                    }
                  : {})}
              >
                {body}
              </p>
            ) : null}
          </div>
        ) : null}

        <div
          className="feature-video__frame"
          {...(homeMotion
            ? {
                "data-hm": "clip",
                style: { "--hm-delay": "120ms" } as CSSProperties,
              }
            : {})}
        >
          {videoUrl ? (
            <>
              <video
                ref={videoRef}
                className="feature-video__video"
                src={videoUrl}
                controls={playing}
                playsInline
                preload={playing ? "auto" : "none"}
                poster={posterUrl}
                onEnded={() => setPlaying(false)}
              />
              {playing ? (
                <button
                  type="button"
                  className={`feature-video__sound${soundOn ? " feature-video__sound--on" : ""}`}
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  aria-label={soundOn ? "Mute music" : "Play music"}
                >
                  {soundOn ? "Mute" : "Sound on"}
                </button>
              ) : (
                <button
                  type="button"
                  className="feature-video__play-btn"
                  onClick={() => setPlaying(true)}
                  aria-label={`Play ${title || label || "film"}`}
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
