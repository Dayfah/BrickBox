'use client';

import { useCallback, useEffect, useState } from 'react';
import { PhantomConnect } from '../../components/wallet/PhantomConnect';
import { hasMint } from '../../lib/solana';

const MINT = process.env.NEXT_PUBLIC_BRICK_TOKEN_MINT || '';

export default function PerksPage() {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [isHolder, setIsHolder] = useState<boolean | null>(null);

  const onConnected = useCallback((k: string) => setPubkey(k), []);

  useEffect(() => {
    async function go() {
      if (!pubkey || !MINT) return;
      setChecking(true);
      const ok = await hasMint(pubkey, MINT);
      setIsHolder(ok);
      setChecking(false);
    }
    go();
  }, [pubkey]);

  return (
    <div className="card">
      <h2>Perks (Token-gated)</h2>
      {!MINT && <div className="small">Set <code>NEXT_PUBLIC_BRICK_TOKEN_MINT</code> in Vercel env to enable holder checks.</div>}
      <div style={{display:'flex', gap:12, alignItems:'center', marginTop: 8}}>
        <PhantomConnect onConnected={onConnected} />
      </div>
      {pubkey && <div className="small" style={{marginTop:8}}>Checking holdings on-chain…</div>}
      {checking && <div className="small">Verifying BRICK balance…</div>}
      {isHolder === true && (
        <div style={{marginTop:12}}>
          <div className="card">
            <h3>Welcome, BRICK Holder!</h3>
            <ul>
              <li>Increased upload size</li>
              <li>Private holder feed (soon)</li>
              <li>Early access to drops</li>
            </ul>
          </div>
        </div>
      )}
      {isHolder === false && (
        <div style={{marginTop:12}}>
          <div className="card">
            <h3>Perks locked</h3>
            <p className="small">You’ll need at least 1 BRICK to unlock these.</p>
          </div>
        </div>
      )}
    </div>
  );
}

