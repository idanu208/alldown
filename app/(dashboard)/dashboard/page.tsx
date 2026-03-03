import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const session = await auth();
  const [studentCount, lessonCount, completedCount] = await Promise.all([
    db.enrollment.count(),
    db.lesson.count(),
    session?.user?.id ? db.progress.count({ where: { userId: session.user.id, completedAt: { not: null } } }) : 0
  ]);

  return (
    <section>
      <h1 className="text-2xl font-bold">Ringkasan LMS</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded border p-4">Siswa aktif: {studentCount}</div>
        <div className="rounded border p-4">Total lesson: {lessonCount}</div>
        <div className="rounded border p-4">Progress saya: {completedCount}/{lessonCount}</div>
      </div>
    </section>
  );
}
