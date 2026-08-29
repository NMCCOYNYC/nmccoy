"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDrawer, type DrawerId } from "@/components/DrawerProvider";

export function DrawerRedirect({ id }: { id: DrawerId }) {
  const router = useRouter();
  const { openDrawer } = useDrawer();

  useEffect(() => {
    openDrawer(id);
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  }, [id, openDrawer, router]);

  return null;
}
