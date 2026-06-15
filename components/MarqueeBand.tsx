import { getMarqueeItems } from "@/lib/site-settings";

export function MarqueeBand() {
  const items = getMarqueeItems();
  const track = [...items, ...items];

  return (
    <div className="marquee-band">
      <div className="marquee-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item}
            <span className="dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
