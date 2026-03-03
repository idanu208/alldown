import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Terlalu banyak percobaan login" }, { status: 429 });
  }
  return NextResponse.json({ ok: true });
}
