import Link from "next/link";

const STOREFRONT = process.env.PRINTIFY_STOREFRONT || "https://brickbox.printify.me/";

export default async function ProductsPage(){
  // If you add Printify API keys, you can fetch from /api/products.
  // For now, CTA to storefront to keep it simple and reliable.
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Store</h1>
      <p className="opacity-90">Shop BBX merch via our secure storefront.</p>
      <a href={STOREFRONT} target="_blank" rel="noopener noreferrer" className="inline-block bg-bbxCream text-bbxDark px-4 py-2 rounded">
        Open Storefront
      </a>

      <div className="opacity-70 text-sm">
        <p>Tip: Want in-app product cards? Add PRINTIFY_API_KEY + PRINTIFY_SHOP_ID to .env.local and we’ll enable API mode.</p>
      </div>
    </section>
  );
}
