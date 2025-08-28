"use client";

import { bbxMetadata } from "./metadata";

export default function TokenPage() {
  return (
    <section style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>BBX</h1>
      <p style={{ opacity: 0.85 }}>Token coming soon 🚀</p>
      {bbxMetadata.mint && (
        <p style={{ marginTop: "12px", fontSize: "14px", opacity: 0.8 }}>
          Mint address is configured via <code>NEXT_PUBLIC_BRICK_TOKEN_MINT</code>. Keep
          your private keys secure.
        </p>
      )}
    </section>
  );
}
