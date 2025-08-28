import Link from 'next/link';
import { bbxMetadata } from '@/app/token/metadata';

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
      <a
        href={bbxMetadata.external_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Token
      </a>
      <Link href="/social">Social</Link>
      <Link href="/perks">Perks</Link>
      <Link href="/shop">Shop</Link>
    </nav>
  );
}
