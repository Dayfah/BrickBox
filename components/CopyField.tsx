"use client";
import { useState } from "react";

export default function CopyField({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm opacity-80">{label}</div>
      <div className="flex gap-2">
        <input
          readOnly
          value={value || ""}
          className={`flex-1 p-3 rounded bg-bbxDark border border-bbxCream text-bbxCream ${
            mono ? "font-mono text-sm" : ""
          }`}
        />
        <button
          onClick={doCopy}
          className="px-3 py-2 rounded bg-bbxRed text-bbxCream whitespace-nowrap"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
