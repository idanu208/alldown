"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">Daftar</h1>
      <form
        className="mt-6 space-y-3"
        onSubmit={handleSubmit(async (values) => {
          const res = await fetch("/api/register", { method: "POST", body: JSON.stringify(values) });
          if (res.ok) router.push("/auth/login");
        })}
      >
        <Input placeholder="Nama" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <Input type="password" placeholder="Password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <Button disabled={isSubmitting}>Buat Akun</Button>
      </form>
    </main>
  );
}
