"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type DrawerId = "account" | "cart";

type DrawerContextValue = {
  openId: DrawerId | null;
  isOpen: (id: DrawerId) => boolean;
  openDrawer: (id: DrawerId) => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextValue | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [openId, setOpenId] = useState<DrawerId | null>(null);

  const openDrawer = useCallback((id: DrawerId) => setOpenId(id), []);
  const closeDrawer = useCallback(() => setOpenId(null), []);
  const isOpen = useCallback((id: DrawerId) => openId === id, [openId]);

  const value = useMemo(
    () => ({ openId, isOpen, openDrawer, closeDrawer }),
    [openId, isOpen, openDrawer, closeDrawer],
  );

  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within DrawerProvider");
  }
  return context;
}
