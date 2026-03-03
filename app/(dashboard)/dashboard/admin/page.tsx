import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [courses, cohorts, activeStudents] = await Promise.all([
    db.course.count(),
    db.cohort.count(),
    db.user.count({ where: { role: "STUDENT" } })
  ]);

  return (
    <div>
      <h1 className="text-xl font-bold">Panel Admin</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <div className="rounded border p-3">Course: {courses}</div>
        <div className="rounded border p-3">Cohort: {cohorts}</div>
        <div className="rounded border p-3">Siswa: {activeStudents}</div>
      </div>
    </div>
  );
}
