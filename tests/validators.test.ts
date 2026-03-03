import { describe, expect, it } from "vitest";
import { registerSchema, contactSchema } from "@/lib/validators";

describe("validators", () => {
  it("validasi register sukses", () => {
    const parsed = registerSchema.safeParse({ name: "Asep", email: "asep@mail.com", password: "Password123" });
    expect(parsed.success).toBe(true);
  });

  it("validasi kontak gagal jika pesan pendek", () => {
    const parsed = contactSchema.safeParse({ name: "Ana", email: "ana@mail.com", message: "pendek" });
    expect(parsed.success).toBe(false);
  });
});
