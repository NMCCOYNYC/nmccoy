import { AccountPageClient } from "@/components/AccountPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Account",
  description: "Sign in to your NMCCOY account.",
  path: "/account",
  robots: { index: false, follow: false },
});

export default function AccountPage() {
  return <AccountPageClient />;
}
