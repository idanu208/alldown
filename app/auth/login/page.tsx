"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">Masuk</h1>
      <form
        className="mt-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/login", { method: "POST" });
          const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/dashboard" });
          if (res?.error) setError("Email/password salah");
        }}
      >
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button>Login</Button>
      </form>
    </main>
  );
}
