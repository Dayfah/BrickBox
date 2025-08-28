"use client";
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/token">Token</Link>
  <Link href="/live">Live</Link>
  <Link href="/social">Social</Link>
      <a
        href="https://brickbox.printify.me"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shop
      </a>
    </nav>
  );
}

