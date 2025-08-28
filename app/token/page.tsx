import { bbxMetadata } from './metadata';

export const metadata = {
  title: 'BBX Token',
  description: 'Details about the BrickBox utility token.',
};

export default function TokenPage() {
  const mint = process.env.NEXT_PUBLIC_BRICK_TOKEN_MINT;
  const buyUrl = mint ? `https://jup.ag/swap/SOL-${mint}` : null;
  return (
    <main style={{ padding: 24 }}>
      <h1>
        {bbxMetadata.name} ({bbxMetadata.symbol})
      </h1>
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
