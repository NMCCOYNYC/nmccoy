"use client";

import { useState } from "react";

export function Accordion({
  items,
}: {
  items: { title: string; content: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className="acc-item" key={item.title}>
            <button
              type="button"
              className="acc-trigger"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
            >
              {item.title}
              <span className={`acc-icon${open ? " open" : ""}`}>+</span>
            </button>
            <div className={`acc-content${open ? " open" : ""}`}>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}
