import { NextResponse } from "next/server";

export async function POST(req: Request){
  const form = await req.formData();
  const name = (form.get("name")||"").toString();
  const email = (form.get("email")||"").toString();
  const message = (form.get("message")||"").toString();
  // TODO: send via email service or webhook
  console.log({ name, email, message });
  return NextResponse.json({ ok: true });
}
