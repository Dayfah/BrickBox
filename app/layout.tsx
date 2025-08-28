import './globals.css';

export const metadata = {
  title: 'BBX',
  description: 'BBX token coming soon 🚀',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
