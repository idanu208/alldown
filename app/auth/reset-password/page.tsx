"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <p className="mt-2 text-sm">Versi sederhana: kirim email untuk instruksi reset.</p>
      <form className="mt-4 space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        await fetch("/api/reset-password", { method: "POST", body: JSON.stringify({ email }) });
        alert("Jika email terdaftar, instruksi reset telah dikirim.");
      }}>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <Button>Kirim Link Reset</Button>
      </form>
    </main>
  );
}
