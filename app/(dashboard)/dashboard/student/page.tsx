import Link from "next/link";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function StudentDashboard() {
  const session = await auth();
  const enrollments = await db.enrollment.findMany({
    where: { userId: session?.user?.id },
    include: { cohort: { include: { course: true } } }
  });

  return (
    <div>
      <h1 className="text-xl font-bold">Portal Siswa</h1>
      <ul className="mt-4 space-y-3">
        {enrollments.map((e) => (
          <li key={e.id} className="rounded border p-3">
            <p>{e.cohort.course.title} - {e.cohort.name}</p>
            <Link className="text-blue-600" href={`/course/${e.cohort.course.slug}`}>Lihat materi</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
