import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { registerSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const exists = await db.user.findUnique({ where: { email: parsed.data.email } });
  if (exists) return NextResponse.json({ error: "Email sudah dipakai" }, { status: 409 });

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await db.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, passwordHash }
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
