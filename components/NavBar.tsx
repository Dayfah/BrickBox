"use client";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-bbxDark text-bbxCream border-b border-bbxRed">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/token">Token</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <a
        href="https://brickbox.printify.me"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-bbxRed"
      >
        Store
      </a>
    </nav>
  );
}
