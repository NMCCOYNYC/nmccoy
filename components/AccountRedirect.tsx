"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/AccountProvider";

export function AccountRedirect() {
  const router = useRouter();
  const { openAccount } = useAccount();

  useEffect(() => {
    openAccount();
    if (window.history.length > 1) {
      router.back();
    } else {
      router.replace("/");
    }
  }, [openAccount, router]);

  return null;
}
