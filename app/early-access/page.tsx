import Link from "next/link";
import { cookies } from "next/headers";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { GradientFill } from "@/components/GradientFill";
import {
  EARLY_ACCESS_COOKIE,
  hasEarlyAccess,
  isEarlyAccessConfigured,
} from "@/lib/preview-access";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Private Preview",
  description: "Private early access to NMCCOY Collection No. 1.",
  path: "/early-access",
  robots: { index: false, follow: false },
});

function EarlyAccessGate() {
  return (
    <>
      <section className="early-access early-access--gate">
        <FadeIn className="early-access__inner">
          <p className="eyebrow">Private Preview</p>
          <h1>By invitation</h1>
          <p>
            This page is reserved for invited guests. If you received a private
            link, open it directly to enter the full site.
          </p>
        </FadeIn>
      </section>
      <Footer />
    </>
  );
}

export default async function EarlyAccessPage() {
  const cookieStore = await cookies();
  const allowed = hasEarlyAccess(cookieStore.get(EARLY_ACCESS_COOKIE)?.value);

  if (isEarlyAccessConfigured() && !allowed) {
    return <EarlyAccessGate />;
  }

  return (
    <>
      <section className="early-access">
        <GradientFill
          gradient="linear-gradient(165deg,#2A1A10 0%,#5C4A38 45%,#8C603A 70%,#38271E 100%)"
          className="early-access__media"
          aria-hidden={true}
        />
        <div className="early-access__overlay" />
        <FadeIn className="early-access__inner">
          <p className="eyebrow early-access__eyebrow">Private Preview</p>
          <h1>Early Access</h1>
          <p className="early-access__lede">
            You&apos;re among the first to experience Collection No. 1 — an
            intimate look at Desert Illusions before the public launch.
          </p>
          <p className="early-access__body">
            Browse the collection, explore each piece, and purchase at your
            leisure. This link is unlisted and meant to be shared quietly with
            friends, family, and early supporters.
          </p>
          <div className="early-access__actions">
            <Link href="/collection" className="btn btn--ghost">
              Enter the Collection
            </Link>
            <Link
              href="/about"
              className="btn--underline btn--underline-light early-access__secondary"
            >
              Our Story
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </>
  );
}
