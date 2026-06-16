import Link from "next/link";

export default function AdminPage() {
  return (
    <div
      style={{
        minHeight: "100svh",
        padding: "10rem 2rem 4rem",
        maxWidth: "720px",
        margin: "0 auto",
      }}
    >
      <p className="eyebrow">Admin</p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem,4vw,3rem)",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
        }}
      >
        Coming in Phase 2
      </h1>
      <p style={{ color: "var(--taupe)", lineHeight: 1.8, marginBottom: "2rem" }}>
        This hidden route will let you update products, images, and copy once
        Supabase Auth is connected.
      </p>
      <ul style={{ color: "var(--taupe)", lineHeight: 2, marginBottom: "2rem" }}>
        <li>Edit the 6 scarf designs and inventory</li>
        <li>Upload product photography</li>
        <li>View email signups and contact messages</li>
      </ul>
      <Link href="/" className="btn btn--dark">
        Back to site
      </Link>
    </div>
  );
}
