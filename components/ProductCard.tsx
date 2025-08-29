import Link from "next/link";
import Image from "next/image";

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-bbxRed rounded p-4 space-y-2 text-center">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-bbxRed font-bold">${product.price}</p>
      <Link href={`/products/${product.id}`} className="text-bbxCream underline">
        View Details
      </Link>
    </div>
  );
}
