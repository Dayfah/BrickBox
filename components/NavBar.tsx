'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        backgroundColor: '#1f1f1f',
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/token">BBX Token</Link>
      <Link href="/social">Social</Link>
      <a href="https://brickbox.printify.me/" target="_blank" rel="noopener noreferrer">
        Shop
      </a>
    </nav>
  );
}
