import Link from "next/link";
import { db } from "@/lib/db";
import { Markdown } from "@/components/markdown";
import { CompleteButton } from "./complete-button";

export default async function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const lesson = await db.lesson.findUnique({
    where: { id: params.lessonId },
    include: { module: { include: { lessons: { orderBy: { order: "asc" } }, course: true } }, assignments: true }
  });

  if (!lesson) return <main className="p-6">Lesson tidak ditemukan.</main>;
  const lessons = lesson.module.lessons;
  const index = lessons.findIndex((l) => l.id === lesson.id);
  const prev = lessons[index - 1];
  const next = lessons[index + 1];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">{lesson.title}</h1>
      <article className="prose mt-4 max-w-none rounded border p-4"><Markdown source={lesson.contentMarkdown} /></article>
      <div className="mt-4"><CompleteButton lessonId={lesson.id} /></div>
      <div className="mt-6 flex justify-between">
        {prev ? <Link href={`/course/${params.slug}/lesson/${prev.id}`}>← {prev.title}</Link> : <span />}
        {next ? <Link href={`/course/${params.slug}/lesson/${next.id}`}>{next.title} →</Link> : <span />}
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-semibold">Assignment</h2>
        {lesson.assignments.length === 0 ? <p>Belum ada tugas.</p> : lesson.assignments.map((a) => (
          <div className="mt-3 rounded border p-3" key={a.id}><p className="font-medium">{a.title}</p></div>
        ))}
      </section>
    </main>
  );
}
