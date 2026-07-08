"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Package } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { navItems } from "./BottomNav";

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { livreur, deconnexion } = useAuth();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-100 bg-surface px-4 py-6 lg:flex">
      <div className="flex items-center gap-2.5 px-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white">
          <Package className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="font-extrabold tracking-tight">Tchokos Sarl</p>
          <p className="text-xs font-medium text-primary">Espace livreur</p>
        </div>
      </div>

      <nav className="mt-8 flex-1">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const actif = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    actif
                      ? "bg-primary-soft text-primary-dark"
                      : "text-slate-500 hover:bg-slate-50 hover:text-secondary"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="rounded-2xl bg-slate-50 p-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {livreur?.initiales}
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold">{livreur?.nom}</p>
            <p className="truncate text-xs text-slate-400">{livreur?.matricule}</p>
          </div>
        </div>
        <button
          onClick={deconnexion}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
