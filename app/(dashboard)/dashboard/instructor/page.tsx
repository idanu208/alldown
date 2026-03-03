import { db } from "@/lib/db";

export default async function InstructorDashboard() {
  const submissions = await db.submission.findMany({ include: { assignment: true, user: true }, take: 10 });

  return (
    <div>
      <h1 className="text-xl font-bold">Panel Instruktur</h1>
      <table className="mt-4 w-full border">
        <thead><tr><th>Tugas</th><th>Siswa</th><th>Status</th></tr></thead>
        <tbody>
          {submissions.map((s) => (
            <tr key={s.id} className="border-t"><td>{s.assignment.title}</td><td>{s.user.name}</td><td>{s.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
