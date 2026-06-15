"use client";

import { siteSettings } from "@/lib/site-settings";

export function ReserveModal({
  open,
  onClose,
  scarfName,
  checkoutUrl,
}: {
  open: boolean;
  onClose: () => void;
  scarfName: string;
  checkoutUrl?: string;
}) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div className="modal-box">
        <button type="button" className="modal-close" onClick={onClose}>
          Close
        </button>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>
          Reserve
        </p>
        <h2
          id="modalTitle"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 400,
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          {scarfName}
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "var(--taupe)",
            marginBottom: "2rem",
            lineHeight: 1.7,
          }}
        >
          A ${siteSettings.depositAmount} deposit (50%) reserves your numbered
          piece. Remaining ${siteSettings.fullPrice - siteSettings.depositAmount}{" "}
          due at shipping {siteSettings.launchDate}. Fully refundable until{" "}
          {siteSettings.refundDeadline}.
        </p>
        {checkoutUrl ? (
          <a
            href={checkoutUrl}
            className="btn btn--dark"
            style={{
              width: "100%",
              textAlign: "center",
              display: "block",
              padding: "1.1rem",
            }}
          >
            Continue to Checkout — ${siteSettings.depositAmount}
          </a>
        ) : (
          <button
            type="button"
            className="btn btn--dark"
            style={{
              width: "100%",
              textAlign: "center",
              padding: "1.1rem",
              opacity: 0.6,
              cursor: "not-allowed",
            }}
            disabled
            title="Shopify checkout will be connected in Phase 2"
          >
            Checkout coming soon — ${siteSettings.depositAmount}
          </button>
        )}
      </div>
    </div>
  );
}
