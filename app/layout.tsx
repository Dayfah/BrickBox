import './globals.css';
import NavBar from '@/components/NavBar';

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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
