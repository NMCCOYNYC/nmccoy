import Image from "next/image";
import Link from "next/link";
import { getNavCtaLabel } from "@/lib/site-settings";

type LogoProps = {
  light?: boolean;
  className?: string;
};

export function Logo({ light = false, className = "" }: LogoProps) {
  const src = light
    ? "/logos/nmccoy-wordmark-ivory.png"
    : "/logos/nmccoy-wordmark-brown.png";

  return (
    <Link href="/" className={`logo-link ${className}`} aria-label="NMCCOY home">
      <Image
        src={src}
        alt="NMCCOY"
        width={182}
        height={24}
        className="logo-image"
        priority
      />
    </Link>
  );
}

export function FooterLogo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`logo-link ${className}`} aria-label="NMCCOY home">
      <Image
        src="/logos/nm-monogram-ivory.png"
        alt="NMCCOY monogram"
        width={60}
        height={30}
        className="logo-image logo-image--monogram"
      />
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
