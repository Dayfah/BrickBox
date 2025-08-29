"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setStatus(res.ok ? "Message sent!" : "Failed to send");
    form.reset();
  }

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          required
          className="w-full p-2 border rounded text-bbxDark"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          required
          className="w-full p-2 border rounded text-bbxDark"
          placeholder="Email"
        />
        <textarea
          name="message"
          required
          className="w-full p-2 border rounded text-bbxDark"
          placeholder="Message"
        />
        <button type="submit" className="bg-bbxRed text-bbxCream px-4 py-2 rounded">
          Send
        </button>
      </form>
      {status && <p className="text-center">{status}</p>}
    </section>
  );
}
