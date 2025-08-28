interface Props { params: { id: string } }
export default async function ProductDetail({ params }: Props){
  const hasApi = !!process.env.PRINTIFY_API_KEY && !!process.env.PRINTIFY_SHOP_ID;
  if(!hasApi){
    return (
      <section className="max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Product</h1>
        <p className="opacity-90">Enable PRINTIFY_API_KEY + PRINTIFY_SHOP_ID to view product details here.</p>
      </section>
    );
  }
  const res = await fetch(`${process.env.SITE_URL || "http://localhost:3000"}/api/products?id=${params.id}`, { cache: "no-store" });
  if(!res.ok) return <p className="opacity-80">Failed to load product.</p>;
  const p = await res.json();
  return (
    <article className="max-w-2xl mx-auto space-y-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={p.image} alt={p.title} className="w-full rounded-md" />
      <h1 className="text-3xl font-bold">{p.title}</h1>
      <p>{p.description || "—"}</p>
      <p className="text-xl font-semibold">{p.price}</p>
      {p.link && <a href={p.link} className="inline-block bg-bbxRed text-bbxCream px-4 py-2 rounded">Buy Now</a>}
    </article>
  );
}
