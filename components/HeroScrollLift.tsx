"use client";

import { useEffect, useRef } from "react";

export function HeroScrollLift({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const section = el.closest("section");
    if (!section) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height * 0.55, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      el.style.transform = `translate3d(0, ${(-14 * progress).toFixed(1)}px, 0)`;
      el.style.opacity = (1 - progress * 0.14).toFixed(3);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className="hero-scroll-lift">
      {children}
    </div>
  );
}
