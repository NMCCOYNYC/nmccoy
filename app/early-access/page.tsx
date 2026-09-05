import { redirect } from "next/navigation";
import { FadeIn } from "@/components/FadeIn";
import { isEarlyAccessConfigured } from "@/lib/preview-access";
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
          <p className="early-access__gate-copy">
            A first look at Desert Illusions before its public release. Enter
            the password from your invitation to preview Collection No. 1.
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
    </>
  );
}

export default async function EarlyAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  if (!isEarlyAccessConfigured()) {
    redirect("/");
  }

  const params = await searchParams;
  return <EarlyAccessGate invalid={Boolean(params.key)} />;
}
