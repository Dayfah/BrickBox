import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.PRINTIFY_API_TOKEN;
  if (!token) {
    return NextResponse.json({ ok: false, reason: 'MISSING_TOKEN' });
  }
  let shopId = process.env.PRINTIFY_SHOP_ID;
  if (!shopId) {
    const shopsRes = await fetch('https://api.printify.com/v1/shops.json', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const shops = await shopsRes.json();
    if (Array.isArray(shops) && shops.length > 0) {
      shopId = String(shops[0].id);
    }
  }
  if (!shopId) return NextResponse.json({ ok: false, reason: 'NO_SHOP' });

  const res = await fetch(`https://api.printify.com/v1/shops/${shopId}/products.json`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store'
  });
  const json = await res.json();
  const products = Array.isArray(json) ? json : (json?.data ?? []);
  return NextResponse.json({ ok: true, products });
}
