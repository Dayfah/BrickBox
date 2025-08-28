import Link from 'next/link';
import './globals.css';
import { bbxMetadata } from './token/metadata';

export const metadata = {
  title: 'BrickBox',
  description: 'Comic/Manga Collector hub — coming soon 🚀',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="main-nav">
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
        {children}
      </body>
    </html>
  );
}
