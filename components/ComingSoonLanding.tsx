import Image from "next/image";

import { EmailCapture } from "@/components/EmailCapture";

export function ComingSoonLanding() {
  return (
    <div className="coming-soon">
      <div className="coming-soon__texture" aria-hidden="true" />
      <div className="coming-soon__inner">
        <Image
          src="/logos/nmccoy-wordmark-brown.png"
          alt="NMCCOY"
          width={220}
          height={29}
          className="coming-soon__logo"
          priority
        />

        <h1 className="coming-soon__headline">Desert Illusions is coming soon.</h1>

        <p className="coming-soon__lede">
          Original artworks translated into limited-edition Italian silk.
        </p>

        <p className="coming-soon__support">
          Join the collection list for studio notes, launch updates, and first
          access.
        </p>

        <EmailCapture variant="coming-soon" source="coming-soon" />
      </div>
    </div>
  );
}
