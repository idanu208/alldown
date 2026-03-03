import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ success: true, message: "Flow reset password sederhana aktif." });
}
