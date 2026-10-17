"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/core/_components/button";
import { TextField } from "@/core/_components/text-field";
import { loginSchema } from "@/lib/validation/auth-schemas";

export function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setServerError("");
    const input = { email: String(formData.get("email") ?? ""), password: String(formData.get("password") ?? "") };
    const result = loginSchema.safeParse(input);
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(result.data) });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        setServerError(payload?.message ?? "No pudimos iniciar sesión. Revisá tus datos.");
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
    <form action={handleSubmit} className="space-y-5">
      <div className="mb-8"><p className="mb-2 text-sm font-semibold text-[#62a985]">Bienvenido de nuevo</p><h2 className="text-3xl font-bold tracking-[-0.05em] text-[#143d2b]">Ingresá a tu cuenta</h2><p className="mt-3 text-sm leading-6 text-[#71877c]">Revisá tus movimientos y mantené tus finanzas en orden.</p></div>
      {serverError ? <div role="alert" className="rounded-xl bg-[#fff0f0] px-4 py-3 text-sm text-[#a34444]">{serverError}</div> : null}
      <TextField name="email" type="email" label="Email" placeholder="vos@ejemplo.com" autoComplete="email" error={errors.email} />
      <TextField name="password" type="password" label="Contraseña" placeholder="••••••••" autoComplete="current-password" error={errors.password} />
      <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Ingresando…" : "Iniciar sesión"}</Button>
      <p className="pt-3 text-center text-sm text-[#71877c]">¿Todavía no tenés cuenta? <Link className="font-bold text-[#28734c] hover:underline" href="/registro">Registrate</Link></p>
    </form>
  );
}
