import Link from "next/link";
import { Button } from "@/components/ui/button";

const benefits = ["Mentoring mingguan", "Project real-world", "Code review intensif"];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-2xl bg-muted p-8">
        <h1 className="text-4xl font-bold">Kelas Fullstack</h1>
        <p className="mt-3 text-lg">LMS + mentoring untuk jadi fullstack engineer siap kerja.</p>
        <div className="mt-5 flex gap-3">
          <Link href="/auth/register"><Button>Daftar Sekarang</Button></Link>
          <Link href="/pricing"><Button className="bg-black">Lihat Pricing</Button></Link>
        </div>
      </section>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {benefits.map((item) => (
          <article key={item} className="rounded-xl border border-border p-4">
            <h2 className="font-semibold">{item}</h2>
            <p className="text-sm text-slate-600">Fokus pada skill backend, frontend, dan deployment.</p>
          </article>
        ))}
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <p className="mt-2">Apakah pemula bisa ikut? Ya, kurikulum dimulai dari dasar TypeScript.</p>
      </section>
    </main>
  );
}
