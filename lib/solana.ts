import { Connection, PublicKey } from "@solana/web3.js";

export function getConnection() {
  const endpoint =
    process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.mainnet-beta.solana.com";
  return new Connection(endpoint, "confirmed");
}

export async function hasMint(owner: string, mint: string): Promise<boolean> {
  try {
    const connection = getConnection();
    const ownerPk = new PublicKey(owner);
    const mintPk = new PublicKey(mint);
    const resp = await connection.getParsedTokenAccountsByOwner(ownerPk, {
      mint: mintPk,
    });
    for (const acc of resp.value) {
      const info: any = acc.account.data.parsed.info;
      const amount = info.tokenAmount?.uiAmount || 0;
      if (amount > 0) return true;
    }
    return false;
  } catch (e) {
    console.error("hasMint error", e);
    return false;
  }
}
