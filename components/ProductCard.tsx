import Link from "next/link";

export default function ProductCard({ id, title, image, price }:{
  id: string; title: string; image: string; price: string;
}) {
  return (
    <Link href={`/products/${id}`} className="block border border-bbxRed/60 p-4 rounded-lg hover:bg-bbxRed/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="w-full h-auto rounded-md" />
      <h3 className="mt-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm">{price}</p>
    </Link>
  );
}
