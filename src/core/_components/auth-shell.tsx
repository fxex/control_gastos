import type { ReactNode } from "react";
import { BrandMark } from "@/core/_components/brand-mark";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <div className="pointer-events-none fixed -right-32 -top-32 h-96 w-96 rounded-full bg-[#d9f1e4] opacity-70 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#f3ddbc] opacity-40 blur-3xl" />
      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white bg-white/80 shadow-[0_24px_80px_rgba(32,76,55,0.12)] backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        <div className="hidden bg-[#143d2b] p-12 text-white md:flex md:flex-col md:justify-between">
          <BrandMark />
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#9cd5b5]">Tu plata, más clara</p>
            <h1 className="max-w-sm text-5xl font-bold leading-[1.02] tracking-[-0.06em]">
              Tomá el control de tus gastos.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-[#c5dfce]">
              Una forma simple de entender a dónde va tu dinero y tomar mejores decisiones cada mes.
            </p>
          </div>
          <p className="text-sm text-[#9cd5b5]">Hecho para avanzar, un gasto a la vez.</p>
        </div>
        <div className="p-7 sm:p-12">
          <div className="mb-10 md:hidden"><BrandMark /></div>
          {children}
        </div>
      </section>
    </main>
  );
}
