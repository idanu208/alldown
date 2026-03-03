"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = contactSchema;
type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
    reset();
    alert("Pesan terkirim");
  };

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-bold">Kontak</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div><Input placeholder="Nama" {...register("name")} />{errors.name && <p>{errors.name.message}</p>}</div>
        <div><Input placeholder="Email" {...register("email")} />{errors.email && <p>{errors.email.message}</p>}</div>
        <textarea className="w-full rounded-md border p-2" rows={5} placeholder="Pesan" {...register("message")} />
        {errors.message && <p>{errors.message.message}</p>}
        <Button disabled={isSubmitting}>Kirim</Button>
      </form>
    </main>
  );
}
