import Link from "next/link";
import { getNavCtaLabel } from "@/lib/site-settings";

type LogoProps = {
  light?: boolean;
  className?: string;
};

export function Logo({ light = false, className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`logo-wordmark ${light ? "logo-wordmark--light" : ""} ${className}`}
      aria-label="NMCCOY home"
    >
      NMCCOY
    </Link>
  );
}

export function NavLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <li>
      <Link href={href} className={active ? "active" : undefined}>
        {children}
      </Link>
    </li>
  );
}

export function CollectionCta() {
  const label = getNavCtaLabel();
  return (
    <Link href="/collection" className="nav__cta">
      {label}
    </Link>
  );
}
