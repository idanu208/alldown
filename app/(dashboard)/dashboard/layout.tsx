import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <h2 className="font-bold">Dashboard</h2>
        <nav className="mt-4 space-y-2 text-sm">
          <Link href="/dashboard">Overview</Link>
          <Link className="block" href="/dashboard/student">Student</Link>
          <Link className="block" href="/dashboard/instructor">Instructor</Link>
          <Link className="block" href="/dashboard/admin">Admin</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between rounded-md border p-3">
          <p>{session?.user?.name} ({session?.user?.role})</p>
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}>
            <button type="submit">Logout</button>
          </form>
        </div>
        {children}
      </main>
    </div>
  );
}
