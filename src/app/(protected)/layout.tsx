import type { ReactNode } from "react";
import { BrandMark } from "@/core/_components/brand-mark";
import { LogoutButton } from "@/core/_components/logout-button";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <header className="border-b border-[#e1ebe4] bg-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-8">
          <BrandMark />
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block"><p className="text-xs text-[#82978c]">Sesión iniciada como</p><p className="text-sm font-semibold text-[#28463a]">{user.name}</p></div>
            <LogoutButton />
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
