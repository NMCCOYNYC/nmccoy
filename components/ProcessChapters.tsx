"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export type ProcessStep = {
  num: string;
  title: string;
  bleed: [string, string];
  body: string[];
  visual: string;
  image: string;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mapRange(value: number, inMin: number, inMax: number) {
  if (inMax === inMin) return 0;
  return clamp((value - inMin) / (inMax - inMin));
}

export function ProcessChapters({ steps }: { steps: ProcessStep[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>("[data-process-chapter]")
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      chapters.forEach((el) => {
        el.style.setProperty("--title", "0");
        el.style.setProperty("--detail", "1");
        el.dataset.state = "detail";
      });
      return;
    }

    let frame = 0;

    const update = () => {
      const vh = window.innerHeight;

      chapters.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;

        const range = el.offsetHeight - vh;
        const progress = range > 0 ? clamp(-rect.top / range) : 1;
        const title = 1 - mapRange(progress, 0.32, 0.52);
        const detail = mapRange(progress, 0.38, 0.58);

        el.style.setProperty("--title", title.toFixed(3));
        el.style.setProperty("--detail", detail.toFixed(3));
        el.dataset.state = detail > 0.55 ? "detail" : "title";
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps]);

  const scrollToChapter = (index: number) => {
    const root = rootRef.current;
    if (!root) return;
    const chapter = root.querySelectorAll<HTMLElement>("[data-process-chapter]")[
      index
    ];
    chapter?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={rootRef} className="process-chapters">
      {steps.map((step, index) => (
        <section
          key={step.num}
          className="process-chapter"
          data-process-chapter
          data-step={step.num}
          aria-labelledby={`process-step-${step.num}`}
        >
          <div className="process-chapter__sticky">
            <div className="process-chapter__index" aria-hidden="true">
              {steps.map((item, itemIndex) => (
                <button
                  key={item.num}
                  type="button"
                  className={
                    item.num === step.num
                      ? "process-chapter__index-item is-active"
                      : "process-chapter__index-item"
                  }
                  onClick={() => scrollToChapter(itemIndex)}
                  tabIndex={-1}
                >
                  {item.num}
                </button>
              ))}
            </div>

            <div className="process-chapter__bleed" aria-hidden="true">
              <p className="process-chapter__bleed-text">
                <span>{step.bleed[0]}</span>
                <span>{step.bleed[1]}</span>
              </p>
            </div>

            <p className="process-chapter__num" aria-hidden="true">
              {step.num}
            </p>

            <div className="process-chapter__detail">
              <div className="process-chapter__copy">
                <p className="eyebrow process-chapter__kicker">{step.num}</p>
                <h2 id={`process-step-${step.num}`} className="process-chapter__title">
                  {step.title}
                </h2>
                <div className="process-chapter__body">
                  {step.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="process-chapter__photo">
                <Image
                  src={step.image}
                  alt={step.visual}
                  fill
                  className="process-chapter__photo-img"
                  sizes="(max-width: 960px) 92vw, 58vw"
                />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
