"use client";

import { useEffect } from "react";
import { useDrawer, type DrawerId } from "@/components/DrawerProvider";

export function SiteDrawer({
  id,
  title,
  children,
  footer,
}: {
  id: DrawerId;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { isOpen, closeDrawer } = useDrawer();
  const open = isOpen(id);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeDrawer]);

  if (!open) return null;

  return (
    <div className="site-drawer" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="site-drawer__backdrop"
        onClick={closeDrawer}
        aria-label={`Close ${title}`}
      />
      <aside className="site-drawer__panel">
        <header className="site-drawer__head">
          <p className="site-drawer__title">{title}</p>
          <button
            type="button"
            className="site-drawer__x"
            onClick={closeDrawer}
            aria-label="Close"
          >
            <span />
            <span />
          </button>
        </header>
        <div className="site-drawer__body">{children}</div>
        {footer ? <div className="site-drawer__footer">{footer}</div> : null}
      </aside>
    </div>
  );
}
