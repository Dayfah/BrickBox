import CopyField from "../../components/CopyField";

export default function WalletPage() {
  const WALLET = process.env.SOLANA_WALLET || "";
  const TOKEN = process.env.SOLANA_TOKEN || "";
  const MINT = process.env.MINT_ADDRESS || "";
  const EXPLORER = process.env.TOKEN_LINK || "#";

  const notLive = !WALLET || !TOKEN || !MINT || EXPLORER === "#";

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">Wallet</h1>
      <p className="opacity-90 text-center">
        Your public info for the BBX ecosystem. Share as needed, and keep your private keys safe.
      </p>

      {notLive ? (
        <p className="opacity-80 text-center">BBX Token isn't live yet—check back in a minute.</p>
      ) : (
        <>
          <div className="space-y-4">
            <CopyField label="Solana Wallet Address" value={WALLET} />
            <CopyField label="Token Address" value={TOKEN} />
            <CopyField label="Mint Address" value={MINT} />
          </div>

          <div className="text-center">
            <a
              href={EXPLORER}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-bbxCream text-bbxDark px-5 py-3 rounded font-semibold"
            >
              View on Solana Explorer
            </a>
          </div>
        </>
      )}
    </section>
  );
}

