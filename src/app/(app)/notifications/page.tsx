"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BellOff, Info, MapPin, Package, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { notifications as source } from "@/lib/data";
import type { Notification, TypeNotification } from "@/lib/types";

const icones: Record<TypeNotification, typeof Package> = {
  nouvelle_commande: Package,
  rappel: Clock,
  systeme: Info,
};

const teintes: Record<TypeNotification, string> = {
  nouvelle_commande: "bg-primary-soft text-primary-dark",
  rappel: "bg-warn-soft text-warn",
  systeme: "bg-info-soft text-info",
};

export default function NotificationsPage() {
  const { livreur } = useAuth();
  const [items, setItems] = useState<Notification[]>(source);

  const nonLues = items.filter((n) => !n.lu).length;

  const groupes = useMemo(() => {
    const map = new Map<string, Notification[]>();
    for (const n of items) {
      if (!map.has(n.date)) map.set(n.date, []);
      map.get(n.date)!.push(n);
    }
    return Array.from(map.entries());
  }, [items]);

  function marquerLu(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, lu: true } : n)));
  }

  function toutMarquer() {
    setItems((prev) => prev.map((n) => ({ ...n, lu: true })));
  }

  return (
    <div className="animate-rise space-y-5">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Notifications</h1>
          <p className="text-sm text-slate-500">
            {nonLues > 0
              ? `${nonLues} nouvelle${nonLues > 1 ? "s" : ""} notification${nonLues > 1 ? "s" : ""}`
              : "Vous êtes à jour"}
          </p>
        </div>
        {nonLues > 0 && (
          <button
            onClick={toutMarquer}
            className="rounded-full border border-slate-200 bg-surface px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:text-secondary"
          >
            Tout marquer comme lu
          </button>
        )}
      </header>

      <section className="rounded-2xl border border-slate-100 bg-surface p-4">
        <p className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-primary" /> Vos zones affectées
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {livreur?.zones.map((z) => (
            <span
              key={z}
              className="rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary-dark"
            >
              {z}
            </span>
          ))}
        </div>
      </section>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-surface py-16 text-center">
          <BellOff className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 font-semibold text-secondary">Aucune notification</p>
          <p className="text-sm text-slate-500">
            Les commandes de vos zones apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {groupes.map(([date, liste]) => (
            <div key={date}>
              <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wide text-slate-400">
                {date}
              </p>
              <div className="space-y-2">
                {liste.map((n) => {
                  const Icon = icones[n.type];
                  const contenu = (
                    <div
                      className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
                        n.lu
                          ? "border-slate-100 bg-surface"
                          : "border-primary/20 bg-primary-soft/40"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${teintes[n.type]}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-secondary">
                            {n.titre}
                          </p>
                          {!n.lu && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {n.message}
                        </p>
                        <div className="mt-2 flex items-center gap-2 text-xs">
                          {n.zone && (
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-slate-600">
                              {n.zone}
                            </span>
                          )}
                          <span className="text-slate-400">{n.heure}</span>
                        </div>
                      </div>
                    </div>
                  );

                  return n.livraisonId ? (
                    <Link
                      key={n.id}
                      href={`/livraisons/${n.livraisonId}`}
                      onClick={() => marquerLu(n.id)}
                      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
                    >
                      {contenu}
                    </Link>
                  ) : (
                    <button
                      key={n.id}
                      onClick={() => marquerLu(n.id)}
                      className="block w-full text-left"
                    >
                      {contenu}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
