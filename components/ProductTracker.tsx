"use client";

import { useEffect } from "react";
import { analyticsEvents } from "@/lib/analytics";

export function ProductTracker({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  useEffect(() => {
    analyticsEvents.productVisit(slug, name);
  }, [slug, name]);

  return null;
}
