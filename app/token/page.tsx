import Image from "next/image";

export default function TokenPage() {
  return (
    <section className="max-w-2xl mx-auto text-center space-y-6">
      <Image
        src={process.env.BBX_ICON!}
        alt="BBX Token"
        width={140}
        height={140}
      />
      <h1 className="text-4xl font-bold">BBX Token Coming Soon</h1>
      <p className="text-lg">
        The BBX Token will launch soon. Stay connected with BrickBox for updates.
      </p>
      <a
        href={process.env.TOKEN_LINK!}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-bbxRed text-bbxCream px-4 py-2 rounded"
      >
        View on Solana Explorer
      </a>
      <div className="mt-6 space-y-2">
        <p className="text-sm">Mint Address: {process.env.MINT_ADDRESS}</p>
        <p className="text-sm">Wallet: {process.env.SOLANA_WALLET}</p>
      </div>
    </section>
  );
}
