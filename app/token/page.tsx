"use client";

import { useState } from 'react';
import { PhantomConnect } from '../../components/wallet/PhantomConnect';
import { bbxMetadata } from './metadata';

export default function TokenPage() {
  const [pubkey, setPubkey] = useState<string | null>(null);
  const mint = process.env.NEXT_PUBLIC_BRICK_TOKEN_MINT;
  const buyUrl = mint
    ? `https://jup.ag/swap/SOL-${mint}`
    : bbxMetadata.external_url;

  return (
    <main style={{ padding: 24 }}>
      <h1>
        {bbxMetadata.name} ({bbxMetadata.symbol})
      </h1>
      <div style={{ margin: '16px 0' }}>
        <PhantomConnect onConnected={setPubkey} />
      </div>
      {pubkey && (
        <p>Connected wallet: {pubkey}</p>
      )}
      <p>{bbxMetadata.description}</p>
      {buyUrl && (
        <p>
          <a href={buyUrl} target="_blank" rel="noopener noreferrer">
            Buy {bbxMetadata.symbol}
          </a>
        </p>
      )}
      <p>
        <img
          src={bbxMetadata.image}
          alt={bbxMetadata.name}
          style={{ maxWidth: 200 }}
        />
      </p>
      <p>
        <a
          href={bbxMetadata.external_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {bbxMetadata.external_url}
        </a>
      </p>
      <h2>Attributes</h2>
      <ul>
        {bbxMetadata.attributes.map((attr) => (
          <li key={attr.trait_type}>
            <strong>{attr.trait_type}:</strong> {attr.value}
          </li>
        ))}
      </ul>
    </main>
  );
}
