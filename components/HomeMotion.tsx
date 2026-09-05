"use client";

import { useEffect, useRef } from "react";

export function HomeMotion({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 960px)");

    if (reduced.matches) {
      root.classList.add("is-ready", "is-reduced");
      return;
    }

    const items = root.querySelectorAll<HTMLElement>("[data-hm]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    function reveal(el: HTMLElement) {
      el.classList.add("is-in");
      if (el.dataset.hm === "group") {
        el.querySelectorAll<HTMLElement>("[data-hm-child]").forEach((child, i) => {
          child.style.setProperty("--hm-delay", `${i * 70}ms`);
          child.classList.add("is-in");
        });
      }
      if (el.dataset.hm === "stagger") {
        el.querySelectorAll<HTMLElement>("[data-hm]").forEach((child) => {
          child.classList.add("is-in");
        });
      }
    }

    const vh = window.innerHeight;
    items.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.9 && rect.bottom > vh * 0.08) {
        reveal(el);
      } else {
        io.observe(el);
      }
    });

    root.classList.add("is-ready");

    const hero = root.querySelector<HTMLElement>("[data-hm-hero]");
    const depthEls = root.querySelectorAll<HTMLElement>("[data-hm-depth]");
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewH = window.innerHeight;

      if (hero) {
        const rect = hero.getBoundingClientRect();
        const travel = Math.max(rect.height * 0.7, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        const scale = compact.matches ? 1 + progress * 0.012 : 1 + progress * 0.032;
        const y = compact.matches ? progress * 0.8 : progress * 2.4;
        hero.querySelectorAll<HTMLElement>(".hero__media").forEach((media) => {
          media.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0) scale(${scale.toFixed(4)})`;
        });
      }

      if (compact.matches) return;

      depthEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewH) return;
        const progress = (viewH - rect.top) / (viewH + rect.height);
        const shift = (progress - 0.5) * 6;
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}%, 0) scale(1.04)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      io.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div ref={ref} className="home-motion">{children}</div>;
}
