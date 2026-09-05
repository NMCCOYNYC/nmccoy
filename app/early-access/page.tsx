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

function EarlyAccessGate({ invalid }: { invalid?: boolean }) {
  return (
    <>
      <section className="early-access early-access--gate">
        <FadeIn className="early-access__inner">
          <p className="eyebrow">Private Preview</p>
          <h1>By invitation</h1>
          <p>
            Enter the password from your invitation to view Collection No. 1
            before the public launch.
          </p>
          <form className="early-access__form" action="/early-access" method="get">
            <label htmlFor="early-access-key" className="sr-only">
              Password
            </label>
            <input
              id="early-access-key"
              name="key"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
            />
            {invalid ? (
              <p className="early-access__form-error" role="alert">
                That password is not valid.
              </p>
            ) : null}
            <button type="submit" className="btn btn--dark">
              Enter
            </button>
          </form>
        </FadeIn>
      </section>
      <Footer />
    </>
  );
}

export default async function EarlyAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const cookieStore = await cookies();
  const params = await searchParams;
  const allowed = hasEarlyAccess(cookieStore.get(EARLY_ACCESS_COOKIE)?.value);

  if (isEarlyAccessConfigured() && !allowed) {
    return <EarlyAccessGate invalid={Boolean(params.key)} />;
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
