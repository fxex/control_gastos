"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/core/_components/button";
import { TextField } from "@/core/_components/text-field";
import { registerSchema } from "@/lib/validation/auth-schemas";

export function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setServerError("");
    const input = { name: String(formData.get("name") ?? ""), email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? ""), confirmPassword: String(formData.get("confirmPassword") ?? "") };
    const result = registerSchema.safeParse(input);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const payload = { name: result.data.name, email: result.data.email, password: result.data.password };
      const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setServerError(body?.message ?? "No pudimos crear tu cuenta.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setServerError("No pudimos conectar con el servidor. Intentá nuevamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="mb-7"><p className="mb-2 text-sm font-semibold text-[#62a985]">Empezá hoy</p><h2 className="text-3xl font-bold tracking-[-0.05em] text-[#143d2b]">Creá tu cuenta</h2><p className="mt-3 text-sm leading-6 text-[#71877c]">Todo lo que necesitás para ordenar tus finanzas, en un solo lugar.</p></div>
      {serverError ? <div role="alert" className="rounded-xl bg-[#fff0f0] px-4 py-3 text-sm text-[#a34444]">{serverError}</div> : null}
      <TextField name="name" label="Nombre" placeholder="Tu nombre" autoComplete="name" error={errors.name} />
      <TextField name="email" type="email" label="Email" placeholder="vos@ejemplo.com" autoComplete="email" error={errors.email} />
      <div className="grid gap-4 sm:grid-cols-2"><TextField name="password" type="password" label="Contraseña" placeholder="••••••••" autoComplete="new-password" error={errors.password} /><TextField name="confirmPassword" type="password" label="Repetí la contraseña" placeholder="••••••••" autoComplete="new-password" error={errors.confirmPassword} /></div>
      <Button type="submit" className="mt-2 w-full" disabled={isLoading}>{isLoading ? "Creando cuenta…" : "Crear cuenta"}</Button>
      <p className="pt-3 text-center text-sm text-[#71877c]">¿Ya tenés una cuenta? <Link className="font-bold text-[#28734c] hover:underline" href="/login">Iniciá sesión</Link></p>
    </form>
  );
}
