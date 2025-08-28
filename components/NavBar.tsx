"use client";
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/token">Token</Link>
      <Link href="/live">Live</Link>
      <Link href="/social">Social</Link>
      <Link href="/shop">Shop</Link>
    </nav>
  );
}

