import Link from 'next/link';

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
        <nav style={{ display: 'flex', gap: 16, padding: 16 }}>
          <Link href="/">Home</Link>
          <Link href="/token">Token</Link>
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
