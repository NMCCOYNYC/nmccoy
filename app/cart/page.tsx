import { CartPageClient } from "@/components/CartPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Review your NMCCOY selection and continue to checkout.",
  path: "/cart",
  robots: { index: false, follow: false },
});

export default function CartPage() {
  return <CartPageClient />;
}
