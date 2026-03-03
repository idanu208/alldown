import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { canManageContent } from "@/lib/rbac";
import { courseSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const session = await auth();
  if (!canManageContent(session?.user?.role as never)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json();
  const parsed = courseSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const course = await db.course.create({ data: parsed.data });
  return NextResponse.json(course, { status: 201 });
}
