"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ProductLightboxSlide = {
  src: string;
  alt: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.5;
const DOUBLE_SCALE = 2;
const AXIS_DIST = 12;
const DISMISS_DIST = 96;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function getFocusable(root: HTMLElement) {
  return Array.from(
    root.querySelectorAll<HTMLElement>("button:not([disabled]), input")
  ).filter((el) => {
    const style = window.getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  });
}

function pointerDistance(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function pointerMid(
  a: { x: number; y: number },
  b: { x: number; y: number }
) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function ProductLightbox({
  slides,
  index,
  onClose,
  onIndexChange,
  origin,
}: {
  slides: ProductLightboxSlide[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  origin: HTMLElement | null;
}) {
  const labelId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const scaleRef = useRef(MIN_SCALE);
  const panRef = useRef({ x: 0, y: 0 });
  const extraRef = useRef({ x: 0, y: 0 });
  const gestureStartRef = useRef(MIN_SCALE);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{
    dist: number;
    scale: number;
  } | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    panX: number;
    panY: number;
    moved: boolean;
    axis: "none" | "h" | "v";
    mode: "pan" | "idle";
  } | null>(null);
  const skipClickRef = useRef(false);
  const lastTapRef = useRef<{ time: number; x: number; y: number } | null>(null);
  const openedAtRef = useRef(Date.now());
  const isTouchLayout = useCallback(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 960px)").matches,
    []
  );

  const [scale, setScale] = useState(MIN_SCALE);
  const [dragging, setDragging] = useState(false);

  const slide = slides[index];
  const hasMany = slides.length > 1;
  const canPrev = hasMany && index > 0;
  const canNext = hasMany && index < slides.length - 1;

  const applyTransform = useCallback((animate: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.transition = animate
      ? "transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    const { x, y } = panRef.current;
    const extra = extraRef.current;
    canvas.style.transform = `translate(${x + extra.x}px, ${y + extra.y}px) scale(${scaleRef.current})`;
  }, []);

  const clampCurrentPan = useCallback(() => {
    const viewport = viewportRef.current;
    const img = imgRef.current;
    if (!viewport || !img) return;
    const vw = viewport.clientWidth;
    const vh = viewport.clientHeight;
    const iw = img.offsetWidth;
    const ih = img.offsetHeight;
    const s = scaleRef.current;
    const overflowX = Math.max(0, (iw * s - vw) / 2);
    const overflowY = Math.max(0, (ih * s - vh) / 2);
    panRef.current = {
      x: clamp(panRef.current.x, -overflowX, overflowX),
      y: clamp(panRef.current.y, -overflowY, overflowY),
    };
  }, []);

  const resetView = useCallback(() => {
    scaleRef.current = MIN_SCALE;
    panRef.current = { x: 0, y: 0 };
    extraRef.current = { x: 0, y: 0 };
    setScale(MIN_SCALE);
    applyTransform(false);
  }, [applyTransform]);

  const setViewScale = useCallback(
    (next: number, pivot?: { x: number; y: number }, animate = true) => {
      const viewport = viewportRef.current;
      const clamped = clamp(next, MIN_SCALE, MAX_SCALE);
      const prev = scaleRef.current;
      if (clamped === prev) {
        if (clamped <= MIN_SCALE) panRef.current = { x: 0, y: 0 };
        applyTransform(animate);
        return;
      }

      if (pivot && viewport) {
        const rect = viewport.getBoundingClientRect();
        const cx = pivot.x - rect.left - rect.width / 2;
        const cy = pivot.y - rect.top - rect.height / 2;
        const ix = (cx - panRef.current.x) / prev;
        const iy = (cy - panRef.current.y) / prev;
        panRef.current = {
          x: cx - ix * clamped,
          y: cy - iy * clamped,
        };
      } else if (clamped <= MIN_SCALE) {
        panRef.current = { x: 0, y: 0 };
      }

      scaleRef.current = clamped;
      setScale(clamped);
      clampCurrentPan();
      applyTransform(animate);
    },
    [applyTransform, clampCurrentPan]
  );

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };
    html.classList.add("product-lightbox-open");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    const dialog = dialogRef.current;
    const toFocus =
      dialog?.querySelector<HTMLElement>("[data-lightbox-close]") ?? dialog;
    toFocus?.focus();
    openedAtRef.current = Date.now();

    return () => {
      html.classList.remove("product-lightbox-open");
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, scrollY);
      origin?.focus();
    };
  }, [origin]);

  useEffect(() => {
    resetView();
  }, [index, resetView]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && canPrev) {
        e.preventDefault();
        onIndexChange(index - 1);
        return;
      }
      if (e.key === "ArrowRight" && canNext) {
        e.preventDefault();
        onIndexChange(index + 1);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable(dialog);
      if (focusable.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!dialog.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", onKey, true);
    dialog.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      document.removeEventListener("keydown", onKey, true);
      dialog.removeEventListener("touchmove", onTouchMove);
    };
  }, [canNext, canPrev, index, onClose, onIndexChange]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const intensity = e.ctrlKey ? 0.012 : 0.0022;
      const next = scaleRef.current * Math.exp(-e.deltaY * intensity);
      setViewScale(next, { x: e.clientX, y: e.clientY }, !e.ctrlKey);
    };

    const onGestureStart = (e: Event) => {
      e.preventDefault();
      gestureStartRef.current = scaleRef.current;
    };
    const onGestureChange = (e: Event) => {
      e.preventDefault();
      const ge = e as Event & { scale: number; clientX: number; clientY: number };
      setViewScale(
        gestureStartRef.current * ge.scale,
        { x: ge.clientX, y: ge.clientY },
        false
      );
    };
    const onGestureEnd = (e: Event) => {
      e.preventDefault();
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("gesturestart", onGestureStart, { passive: false });
    viewport.addEventListener("gesturechange", onGestureChange, { passive: false });
    viewport.addEventListener("gestureend", onGestureEnd, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("gesturestart", onGestureStart);
      viewport.removeEventListener("gesturechange", onGestureChange);
      viewport.removeEventListener("gestureend", onGestureEnd);
    };
  }, [setViewScale]);

  function beginPinch() {
    const pts = Array.from(pointersRef.current.values());
    if (pts.length < 2) return;
    pinchRef.current = {
      dist: Math.max(1, pointerDistance(pts[0], pts[1])),
      scale: scaleRef.current,
    };
    dragRef.current = null;
    extraRef.current = { x: 0, y: 0 };
    applyTransform(false);
  }

  function isFreshOpen() {
    return Date.now() - openedAtRef.current < 420;
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (isFreshOpen()) return;
    if (e.button !== 0 && e.pointerType === "mouse") return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    e.currentTarget.setPointerCapture(e.pointerId);

    if (pointersRef.current.size >= 2) {
      beginPinch();
      setDragging(true);
      return;
    }

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      panX: panRef.current.x,
      panY: panRef.current.y,
      moved: false,
      axis: "none",
      mode: scaleRef.current > MIN_SCALE ? "pan" : "idle",
    };
    applyTransform(false);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (pointersRef.current.has(e.pointerId)) {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (pinchRef.current && pointersRef.current.size >= 2) {
      const pts = Array.from(pointersRef.current.values());
      const dist = Math.max(1, pointerDistance(pts[0], pts[1]));
      const mid = pointerMid(pts[0], pts[1]);
      setViewScale(pinchRef.current.scale * (dist / pinchRef.current.dist), mid, false);
      return;
    }

    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;

    if (drag.mode === "pan") {
      panRef.current = { x: drag.panX + dx, y: drag.panY + dy };
      clampCurrentPan();
      applyTransform(false);
      setDragging(true);
      return;
    }

    if (drag.axis === "none") {
      if (Math.hypot(dx, dy) < AXIS_DIST) return;
      drag.axis = Math.abs(dx) > Math.abs(dy) * 1.25 ? "h" : "v";
    }

    if (drag.axis === "v") {
      extraRef.current = { x: 0, y: Math.max(0, dy) };
      applyTransform(false);
      return;
    }

    if (drag.axis === "h" && hasMany) {
      extraRef.current = { x: dx, y: 0 };
      applyTransform(false);
    }
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(e.pointerId);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }

    if (pinchRef.current) {
      if (pointersRef.current.size < 2) {
        pinchRef.current = null;
        if (scaleRef.current < 1.08) setViewScale(MIN_SCALE, undefined, true);
        setDragging(false);
      }
      return;
    }

    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);

    if (drag.mode === "pan") {
      if (drag.moved) skipClickRef.current = true;
      return;
    }

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    extraRef.current = { x: 0, y: 0 };

    if (drag.axis === "v" && dy > DISMISS_DIST) {
      onClose();
      return;
    }

    if (drag.axis === "h" && hasMany && Math.abs(dx) > 72) {
      skipClickRef.current = true;
      if (dx < 0 && canNext) onIndexChange(index + 1);
      else if (dx > 0 && canPrev) onIndexChange(index - 1);
      else applyTransform(true);
      return;
    }

    applyTransform(true);

    if (drag.moved) {
      skipClickRef.current = true;
      return;
    }

    const now = Date.now();
    const prevTap = lastTapRef.current;
    if (
      prevTap &&
      now - prevTap.time < 280 &&
      Math.hypot(e.clientX - prevTap.x, e.clientY - prevTap.y) < 28
    ) {
      lastTapRef.current = null;
      skipClickRef.current = true;
      if (scaleRef.current > MIN_SCALE) setViewScale(MIN_SCALE);
      else setViewScale(DOUBLE_SCALE, { x: e.clientX, y: e.clientY });
      return;
    }
    lastTapRef.current = { time: now, x: e.clientX, y: e.clientY };
  }

  function onViewportClick(e: React.MouseEvent<HTMLDivElement>) {
    if (isFreshOpen() || isTouchLayout()) return;
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    if (scaleRef.current > MIN_SCALE) return;
    if (e.target === e.currentTarget) onClose();
  }

  function onImageDoubleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (scaleRef.current > MIN_SCALE) {
      setViewScale(MIN_SCALE);
      return;
    }
    setViewScale(DOUBLE_SCALE, { x: e.clientX, y: e.clientY });
  }

  if (!slide) return null;

  const zoomed = scale > MIN_SCALE;
  const cursor = dragging ? "grabbing" : zoomed ? "grab" : "default";

  return createPortal(
    <div
      ref={dialogRef}
      className="product-lightbox"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      tabIndex={-1}
    >
      <p id={labelId} className="sr-only">
        {slide.alt}
      </p>
      <button
        type="button"
        className="product-lightbox__close"
        data-lightbox-close
        aria-label="Close"
        onClick={onClose}
      >
        <span aria-hidden="true">×</span>
      </button>
      {hasMany ? (
        <>
          <button
            type="button"
            className="product-lightbox__nav product-lightbox__nav--prev"
            aria-label="Previous image"
            disabled={!canPrev}
            onClick={() => canPrev && onIndexChange(index - 1)}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M8 2.25 3.75 6 8 9.75" />
            </svg>
          </button>
          <button
            type="button"
            className="product-lightbox__nav product-lightbox__nav--next"
            aria-label="Next image"
            disabled={!canNext}
            onClick={() => canNext && onIndexChange(index + 1)}
          >
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M4 2.25 8.25 6 4 9.75" />
            </svg>
          </button>
        </>
      ) : null}
      <div className="product-lightbox__zoom" role="group" aria-label="Zoom">
        <button
          type="button"
          aria-label="Zoom in"
          disabled={scale >= MAX_SCALE}
          onClick={() => setViewScale(scaleRef.current + STEP)}
        >
          +
        </button>
        <input
          type="range"
          min={MIN_SCALE}
          max={MAX_SCALE}
          step={0.01}
          value={scale}
          aria-label="Zoom level"
          onChange={(e) => setViewScale(Number(e.target.value))}
        />
        <button
          type="button"
          aria-label="Zoom out"
          disabled={scale <= MIN_SCALE}
          onClick={() => setViewScale(scaleRef.current - STEP)}
        >
          −
        </button>
      </div>
      {hasMany ? (
        <div className="product-lightbox__thumbs" role="tablist" aria-label="Product images">
          {slides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              className={`product-lightbox__thumb${i === index ? " is-active" : ""}`}
              aria-label={`View image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => onIndexChange(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      ) : null}
      <div
        ref={viewportRef}
        className={`product-lightbox__viewport${dragging ? " is-dragging" : ""}`}
        style={{ cursor }}
        onClick={onViewportClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={canvasRef}
          className="product-lightbox__canvas"
          onDoubleClick={onImageDoubleClick}
        >
          {/* Original public file, not the resized Next/Image crop from the gallery. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={slide.src}
            ref={imgRef}
            src={slide.src}
            alt={slide.alt}
            draggable={false}
            className="product-lightbox__img"
            onLoad={() => {
              clampCurrentPan();
              applyTransform(false);
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
