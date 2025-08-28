import './globals.css';
import NavBar from '@/components/NavBar';

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
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
