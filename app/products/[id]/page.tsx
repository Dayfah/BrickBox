import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return <p className="text-center">Supabase not configured</p>;
  }
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!data) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <section className="max-w-md mx-auto space-y-4 text-center">
      <Image
        src={data.image}
        alt={data.name}
        width={400}
        height={400}
        className="mx-auto"
      />
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <p>{data.description}</p>
      <p className="text-bbxRed font-semibold">${data.price}</p>
    </section>
  );
}
