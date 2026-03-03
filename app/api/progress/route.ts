import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { progressSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = progressSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const progress = await db.progress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId: parsed.data.lessonId } },
    update: { completedAt: parsed.data.completed ? new Date() : null },
    create: {
      userId: session.user.id,
      lessonId: parsed.data.lessonId,
      completedAt: parsed.data.completed ? new Date() : null
    }
  });

  return NextResponse.json(progress);
}
