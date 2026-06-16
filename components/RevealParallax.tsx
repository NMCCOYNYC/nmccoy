"use client";

import { useEffect, useRef } from "react";

export function RevealParallax({
  children,
  className = "",
  strength = 20,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.classList.add("visible");
      return;
    }

    const inner = el.querySelector<HTMLElement>(".reveal-parallax__inner");
    const target = inner || el;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) {
        return;
      }

      const progress = (vh - rect.top) / (vh + rect.height);
      const offset = (progress - 0.5) * strength;
      target.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(1.04)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`reveal-parallax ${className}`.trim()}>
      <div className="reveal-parallax__inner">{children}</div>
    </div>
  );
}
