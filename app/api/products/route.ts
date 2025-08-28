import { NextResponse } from "next/server";

export async function GET(request: Request){
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  const apiKey = process.env.PRINTIFY_API_KEY;
  const shopId = process.env.PRINTIFY_SHOP_ID;
  if(!apiKey || !shopId) return NextResponse.json([]);

  const headers = { Authorization: `Bearer ${apiKey}` };

  if(id){
    const r = await fetch(`https://api.printify.com/v1/shops/${shopId}/products/${id}.json`, { headers });
    const data = await r.json();
    return NextResponse.json({
      id: data.id,
      title: data.title,
      description: data.description,
      image: data.images?.[0]?.src ?? "",
      price: `$${(data.variants?.[0]?.price ?? 0)/100}`,
      link: data.sales_channel_product_url ?? ""
    });
  }

  const r = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, { headers });
  const list = await r.json();
  const items = (list?.data||[]).map((p:any)=>({
    id: p.id,
    title: p.title,
    image: p.images?.[0]?.src ?? "",
    price: `$${(p.variants?.[0]?.price ?? 0)/100}`
  }));
  return NextResponse.json(items);
}
