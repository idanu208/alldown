import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { submissionSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const submission = await db.submission.upsert({
    where: {
      assignmentId_userId: {
        assignmentId: parsed.data.assignmentId,
        userId: session.user.id
      }
    },
    update: { answerText: parsed.data.answerText, answerUrl: parsed.data.answerUrl || null },
    create: {
      assignmentId: parsed.data.assignmentId,
      userId: session.user.id,
      answerText: parsed.data.answerText,
      answerUrl: parsed.data.answerUrl || null
    }
  });

  return NextResponse.json(submission, { status: 201 });
}
