'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AuthButton } from './auth/AuthButton';

export function Nav(){
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav className="nav">
      <Link href="/" className="logo">🧱 BrickBox</Link>
      <Link className={isActive('/') ? 'active' : ''} href="/">Feed</Link>
      <Link className={isActive('/collection') ? 'active' : ''} href="/collection">Collection</Link>
      <Link className={isActive('/shop') ? 'active' : ''} href="/shop">Shop</Link>
      <Link className={isActive('/pricing') ? 'active' : ''} href="/pricing">Pricing</Link>
      <Link className={isActive('/token') ? 'active' : ''} href="/token">Token</Link>
      <Link className={isActive('/perks') ? 'active' : ''} href="/perks">Perks</Link>
      <div style={{flex:1}}/>
      <AuthButton/>
    </nav>
  );
}
