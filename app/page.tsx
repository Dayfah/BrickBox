import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="space-y-12 text-center">
      <Image
        src={process.env.BBX_ICON!}
        alt="BrickBox Logo"
        width={200}
        height={200}
        className="mx-auto"
      />
      <h1 className="text-5xl font-bold">Welcome to BrickBox</h1>
      <p className="text-lg max-w-xl mx-auto">
        A modern vault for comic collectors with merch, BBX Token coming soon,
        and Solana + Stripe integrations.
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <Link
          href="/token"
          className="bg-bbxRed text-bbxCream px-6 py-3 rounded"
        >
          Learn About BBX Token
        </Link>
        <Link
          href="/products"
          className="bg-bbxCream text-bbxDark px-6 py-3 rounded"
        >
          Visit Store
        </Link>
      </div>
    </section>
  );
}
