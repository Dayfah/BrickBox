const MINT = process.env.NEXT_PUBLIC_BRICK_TOKEN_MINT || '';

export const bbxMetadata = {
  name: 'BrickBox Token',
  symbol: 'BBX',
  mint: MINT,
  description:
    'Utility token of BrickBox — boosts, discounts, gating, and tips across BrickBox apps and partner shops.',
  image:
    'https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_token.png',
  external_url: MINT ? `https://jup.ag/swap/SOL-${MINT}` : '',
  attributes: [
    { trait_type: 'Project', value: 'BrickBox' },
    { trait_type: 'Utility', value: 'Boosts, Discounts, Gating, Tipping' },
  ],
} as const;
