import React from 'react';

export default function TokenPage() {
  const logo = process.env.NEXT_PUBLIC_BBX_LOGO_URL;
  const mint = process.env.NEXT_PUBLIC_BBX_MINT;

  return (
    <div className="card" style={{ padding: 24 }}>
      <h2>BBX Token (Coming Soon)</h2>
      <p>We’ll use this token to unlock community perks inside BrickBox.</p>
      {logo && (
        <p>
          <img className="token-logo" src={logo} alt="BBX logo" style={{ maxWidth: 200 }} />
        </p>
      )}
      {mint && (
        <div style={{ marginTop: 16 }}>
          <div className="small">Mint address: <code>{mint}</code></div>
          <div className="small">
            <a
              href={`https://solscan.io/token/${mint}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Solscan
            </a>
          </div>
        </div>
      )}
      <hr />
      <ol>
        <li>Open Phantom wallet.</li>
        <li>Tap the "+" icon and choose "Add / Connect Token".</li>
        <li>Paste the mint address and confirm.</li>
      </ol>
    </div>
  );
}

