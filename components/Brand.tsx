import type { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  light?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Logo({ light = false, className = "", onClick }: LogoProps) {
  const src = light
    ? "/logos/nmccoy-wordmark-ivory.svg"
    : "/logos/nmccoy-wordmark-brown.svg";

  return (
    <Link
      href="/"
      scroll
      className={`logo-link ${className}`}
      aria-label="NMCCOY home"
      onClick={onClick}
    >
      <Image
        src={src}
        alt="NMCCOY"
        width={165}
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
        src="/logos/nm-monogram-ivory.svg"
        alt="NMCCOY monogram"
        width={77}
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
