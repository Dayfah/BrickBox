export const bbxMetadata = {
  name: 'BrickBox Token',
  symbol: 'BBX',
  description:
    'Utility token of BrickBox — boosts, discounts, gating, and tips across BrickBox apps and partner shops.',
  image:
    'https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_token.png',
  external_url: 'https://example.com/bbx-token',
  attributes: [
    { trait_type: 'Project', value: 'BrickBox' },
    { trait_type: 'Utility', value: 'Boosts, Discounts, Gating, Tipping' },
    { trait_type: 'Chain', value: 'Solana Token-2022' },
  ],
} as const;

export type BBXMetadata = typeof bbxMetadata;
