"use client";

import { useEffect, useRef, useState } from "react";

export function HeroLoopVideo({
  src,
  className = "",
  lazy = false,
}: {
  src: string;
  className?: string;
  lazy?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(!lazy);

  useEffect(() => {
    if (!lazy) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    const video = ref.current;
    if (!video || !load) return;
    video.muted = true;
    video.volume = 0;
    void video.play().catch(() => {});
  }, [src, load]);

  return (
    <video
      ref={ref}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload={lazy ? "none" : "metadata"}
      aria-hidden="true"
    >
      {load ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
