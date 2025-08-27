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
          <a
            href="https://brickbox.printify.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}
