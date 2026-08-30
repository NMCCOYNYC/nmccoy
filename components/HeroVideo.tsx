"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const apply = (visible: boolean) => {
      video.volume = 1;
      video.muted = !soundOn || !visible;
    };

    apply(true);

    const hero = video.closest(".hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => apply(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [soundOn]);

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
        ref={videoRef}
        className="hero__media hero__media--video"
        autoPlay
        muted={!soundOn}
        loop
        playsInline
        preload="auto"
        poster="/home/desert-illusions-hero-nologo-poster.jpg"
        aria-hidden="true"
      >
        <source src="/home/desert-illusions-hero-nologo.mp4" type="video/mp4" />
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
