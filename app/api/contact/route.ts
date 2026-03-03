import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  await db.contactMessage.create({ data: parsed.data });
  return NextResponse.json({ success: true });
}
