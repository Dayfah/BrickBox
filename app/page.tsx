import Image from "next/image";
import SubscribeButtons from "../components/SubscribeButtons";

const ICON = process.env.BBX_ICON || "https://pmlvtovpbfpbrjaexvqh.supabase.co/storage/v1/object/public/Public/brickbox_icon.png";
const TOKEN_LINK = process.env.TOKEN_LINK || "#";

export default function Home(){
  return (
    <section className="space-y-12 text-center">
      <Image src={ICON} alt="BrickBox" width={200} height={200} className="mx-auto" />
      <h1 className="text-5xl font-bold">Welcome to BrickBox</h1>
      <p className="text-lg max-w-xl mx-auto">
        A modern vault for comic culture. Merch today. BBX Token soon. Join the movement.
      </p>

      <div className="bg-bbxRed/20 p-6 rounded-lg max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">BBX Token – Coming Soon</h2>
        <p className="opacity-90">Track the launch and connect your Solana wallet when we go live.</p>
        <a href={TOKEN_LINK} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-bbxRed text-bbxCream px-4 py-2 rounded">
          View on Solana Explorer
        </a>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Support BrickBox</h2>
        <p className="opacity-90">Choose a plan and get instant access to members-only drops and perks.</p>
        <SubscribeButtons />
      </div>
    </section>
  );
}
