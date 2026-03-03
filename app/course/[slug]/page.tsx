import Link from "next/link";
import { db } from "@/lib/db";

export default async function CourseDetail({ params }: { params: { slug: string } }) {
  const course = await db.course.findUnique({
    where: { slug: params.slug },
    include: { modules: { include: { lessons: true }, orderBy: { order: "asc" } } }
  });

  if (!course) return <main className="p-6">Course tidak ditemukan.</main>;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-bold">{course.title}</h1>
      <p className="mt-2">{course.description}</p>
      <div className="mt-6 space-y-4">
        {course.modules.map((mod) => (
          <section key={mod.id} className="rounded border p-4">
            <h2 className="font-semibold">{mod.title}</h2>
            <ul className="mt-2 list-disc pl-5">
              {mod.lessons.sort((a, b) => a.order - b.order).map((lesson) => (
                <li key={lesson.id}>
                  <Link className="text-blue-600" href={`/course/${course.slug}/lesson/${lesson.id}`}>{lesson.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
