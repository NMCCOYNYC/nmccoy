"use client";

import { useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    video.volume = 1;
    void video.play();
    setSoundOn(next);
  }

  return (
    <>
      <video
        ref={videoRef}
        className="hero__media hero__media--video"
        autoPlay
        muted
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
        className="hero__sound"
        onClick={toggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute hero music" : "Play hero music"}
      >
        {soundOn ? "Sound off" : "Sound on"}
      </button>
    </>
  );
}
