import Image from "next/image";

const ICON = process.env.BBX_ICON || "https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_icon.png";
const TOKEN_LINK = process.env.TOKEN_LINK || "#";
const MINT = process.env.MINT_ADDRESS || "";
const WALLET = process.env.SOLANA_WALLET || "";

export default function TokenPage(){
  return (
    <section className="max-w-2xl mx-auto text-center space-y-6">
      <Image src={ICON} alt="BBX Token" width={140} height={140} />
      <h1 className="text-4xl font-bold">BBX Token Coming Soon</h1>
      <p>We’re building something special for the BrickBox community.</p>
      <a href={TOKEN_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-bbxRed text-bbxCream px-4 py-2 rounded">
        View on Solana Explorer
      </a>
      <div className="mt-6 space-y-1 text-sm opacity-90">
        <p>Mint Address: {MINT}</p>
        <p>Wallet: {WALLET}</p>
      </div>
    </section>
  );
}
