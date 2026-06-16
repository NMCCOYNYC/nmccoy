"use client";

import Link from "next/link";
import { useEffect } from "react";
import { analyticsEvents } from "@/lib/analytics";

export function CollectionTracker() {
  useEffect(() => {
    analyticsEvents.collectionVisit();
  }, []);

  return null;
}

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  event: "email" | "instagram" | "spotify";
  location: string;
  external?: boolean;
};

export function TrackedLink({
  href,
  children,
  className,
  event,
  location,
  external = false,
}: TrackedLinkProps) {
  function handleClick() {
    if (event === "email") analyticsEvents.emailClick(location);
    if (event === "instagram") analyticsEvents.instagramClick(location);
    if (event === "spotify") analyticsEvents.spotifyClick();
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}
