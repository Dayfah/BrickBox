import './globals.css';
import { Nav } from '../components/Nav';

export const metadata = {
  title: 'BrickBox',
  description: 'Comics & manga collections with social vibes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
