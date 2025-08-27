'use client';
import { useEffect, useState } from 'react';

declare global { interface Window { solana?: any; } }

export function PhantomConnect({ onConnected }: { onConnected: (pubkey: string) => void }) {
  const [hasPhantom, setHasPhantom] = useState(false);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    setHasPhantom(!!window.solana?.isPhantom);
    if (window.solana?.isPhantom) {
      window.solana.connect({ onlyIfTrusted: true }).then((res: any) => {
        if (res?.publicKey) {
          const key = String(res.publicKey.toString());
          setPubkey(key);
          onConnected(key);
        }
      }).catch(()=>{});
    }
  }, [onConnected]);

  async function connectNow() {
    setConnecting(true);
    try {
      const res = await window.solana.connect();
      const key = String(res.publicKey.toString());
      setPubkey(key);
      onConnected(key);
    } catch (e) {
      console.error(e);
      alert('Could not connect to Phantom.');
    } finally {
      setConnecting(false);
    }
  }

  if (!hasPhantom) {
    return (
      <a className="btn" href="https://phantom.app/download" target="_blank" rel="noreferrer">
        Install Phantom
      </a>
    );
  }

  if (pubkey) return <span className="small">Wallet: {pubkey.slice(0,4)}…{pubkey.slice(-4)}</span>;
  return <button className="btn" onClick={connectNow} disabled={connecting}>{connecting ? 'Connecting…' : 'Connect Phantom'}</button>;
}
