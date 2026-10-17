import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#62a985]">Resumen</p><h1 className="text-4xl font-bold tracking-[-0.06em] text-[#143d2b]">Hola, {user.name.split(" ")[0]} 👋</h1><p className="mt-3 text-[#71877c]">Este es el punto de partida para ordenar tus gastos.</p></div>
        <div className="rounded-2xl border border-[#dcebe1] bg-[#eaf6ef] px-4 py-3 text-sm text-[#397454]">Tu cuenta está lista para empezar</div>
      </div>
      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-3xl bg-[#143d2b] p-6 text-white shadow-lg shadow-[#143d2b]/10"><p className="text-sm text-[#acd9bd]">Gastos del mes</p><p className="mt-8 text-4xl font-bold tracking-[-0.05em]">$ 0,00</p><p className="mt-2 text-sm text-[#acd9bd]">Todavía no hay movimientos</p></article>
        <article className="rounded-3xl border border-[#e1ebe4] bg-white p-6"><p className="text-sm text-[#71877c]">Presupuesto disponible</p><p className="mt-8 text-4xl font-bold tracking-[-0.05em] text-[#143d2b]">$ 0,00</p><p className="mt-2 text-sm text-[#8ca098]">Configurá tu primer presupuesto</p></article>
        <article className="rounded-3xl border border-[#e1ebe4] bg-white p-6"><p className="text-sm text-[#71877c]">Movimientos</p><p className="mt-8 text-4xl font-bold tracking-[-0.05em] text-[#143d2b]">0</p><p className="mt-2 text-sm text-[#8ca098]">Tus gastos aparecerán acá</p></article>
      </section>
      <section className="mt-6 rounded-3xl border border-dashed border-[#c8ddd0] bg-white/60 p-8 text-center"><p className="text-lg font-bold text-[#28463a]">Tu tablero está listo</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71877c]">En la próxima etapa vas a poder registrar gastos, definir categorías y ver cómo evoluciona tu dinero.</p></section>
    </main>
  );
}
