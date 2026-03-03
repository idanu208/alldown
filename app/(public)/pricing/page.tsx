export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border p-5">
          <h2 className="text-xl font-semibold">Basic</h2>
          <p className="mt-2">Rp999.000</p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Akses materi inti</li>
            <li>Forum komunitas</li>
          </ul>
        </div>
        <div className="rounded-xl border p-5">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2">Rp2.499.000</p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li>Semua fitur Basic</li>
            <li>Mentoring & review tugas</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
