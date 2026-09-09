"use client";

import { useEffect, useRef, useState } from "react";

const HERO_DESKTOP = "/home/desert-illusions-hero-nologo.mp4?v=4";
const HERO_MOBILE = "/home/desert-illusions-hero-mobile.mp4?v=5";
const POSTER_DESKTOP = "/home/desert-illusions-hero-nologo-poster.jpg?v=4";
const POSTER_MOBILE = "/home/desert-illusions-hero-mobile-poster.jpg?v=5";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [poster, setPoster] = useState(POSTER_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 960px)");
    const apply = () => {
      const mobile = mq.matches;
      setSrc(mobile ? HERO_MOBILE : HERO_DESKTOP);
      setPoster(mobile ? POSTER_MOBILE : POSTER_DESKTOP);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const apply = (visible: boolean) => {
      video.volume = 1;
      video.muted = !soundOn || !visible;
    };

    apply(true);
    void video.play();

    const hero = video.closest(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => apply(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [soundOn, src]);

  function toggleSound() {
    const video = videoRef.current;
    const next = !soundOn;
    if (video) {
      video.volume = 1;
      video.muted = !next;
      void video.play();
    }
    setSoundOn(next);
  }

  return (
    <>
      <video
        key={src ?? "poster"}
        ref={videoRef}
        className="hero__media hero__media--video"
        autoPlay
        muted={!soundOn}
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-hidden="true"
      >
        {src ? <source src={src} type="video/mp4" /> : null}
      </video>
      <button
        type="button"
        className={`hero__sound${soundOn ? " hero__sound--on" : ""}`}
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute music" : "Play music"}
      >
        {soundOn ? "Mute" : "Sound on"}
      </button>
    </>
  );
}
