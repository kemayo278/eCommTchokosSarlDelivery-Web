"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell, CheckCircle2, Clock, TrendingUp, Wallet } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { formatFCFA, livraisons, notifications } from "@/lib/data";
import OrderCard from "@/components/OrderCard";

const periodes = ["Aujourd'hui", "Semaine", "Mois"] as const;

export default function DashboardPage() {
  const { livreur } = useAuth();
  const [periode, setPeriode] = useState<(typeof periodes)[number]>(
    "Aujourd'hui"
  );

  const stats = useMemo(() => {
    const livrees = livraisons.filter((l) => l.statut === "livree");
    const enAttente = livraisons.filter(
      (l) => l.statut === "en_attente" || l.statut === "en_cours"
    );
    const gains = livrees.reduce((s, l) => s + l.montant, 0);
    const aEncaisser = enAttente
      .filter((l) => l.modePaiement === "a_la_livraison")
      .reduce((s, l) => s + l.montant, 0);
    return {
      gains,
      aEncaisser,
      nbLivrees: livrees.length,
      nbEnAttente: enAttente.length,
    };
  }, []);

  const nonLues = notifications.filter((n) => !n.lu).length;
  const aTraiter = livraisons.filter((l) => l.statut !== "livree");

  return (
    <div className="animate-rise space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {livreur?.initiales}
          </span>
          <div className="leading-tight">
            <p className="text-sm text-slate-500">Bonjour,</p>
            <p className="font-bold tracking-tight">{livreur?.nom}</p>
          </div>
        </div>
        <Link
          href="/notifications"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-100 bg-surface text-slate-500 transition hover:text-secondary"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {nonLues > 0 && (
            <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
              {nonLues}
            </span>
          )}
        </Link>
      </header>

      <section className="rounded-[var(--radius-card)] bg-secondary p-5 text-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)]">
        <div className="flex items-center justify-between">
          <h2 className="font-bold tracking-tight">Résumé des livraisons</h2>
          <div className="flex rounded-full bg-white/10 p-0.5">
            {periodes.map((p) => (
              <button
                key={p}
                onClick={() => setPeriode(p)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  periode === p ? "bg-primary text-white" : "text-slate-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              Gains encaissés
            </div>
            <p className="mt-1.5 text-lg font-extrabold">
              {formatFCFA(stats.gains)}
            </p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <Wallet className="h-3.5 w-3.5 text-warn" />
              À encaisser
            </div>
            <p className="mt-1.5 text-lg font-extrabold">
              {formatFCFA(stats.aEncaisser)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 bg-primary-soft p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary-dark">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <p className="mt-3 text-2xl font-extrabold text-secondary">
            {stats.nbLivrees}
          </p>
          <p className="text-sm text-slate-500">Livrées</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-warn-soft p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-warn/15 text-warn">
            <Clock className="h-5 w-5" />
          </span>
          <p className="mt-3 text-2xl font-extrabold text-secondary">
            {stats.nbEnAttente}
          </p>
          <p className="text-sm text-slate-500">En attente</p>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold tracking-tight">Mes commandes</h2>
          <Link
            href="/livraisons"
            className="text-sm font-semibold text-primary-dark hover:underline"
          >
            Voir tout
          </Link>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {aTraiter.map((l) => (
            <OrderCard key={l.id} livraison={l} />
          ))}
        </div>
      </section>
    </div>
  );
}
