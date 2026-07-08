"use client";

import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";
import { endOfDay, startOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { livraisons, parseCreeLe } from "@/lib/data";
import type { StatutLivraison } from "@/lib/types";
import OrderCard from "@/components/OrderCard";
import DateRangeFilter from "@/components/DateRangeFilter";

type Filtre = "toutes" | Extract<StatutLivraison, "en_attente" | "en_cours" | "livree">;

const filtres: { cle: Filtre; label: string }[] = [
  { cle: "toutes", label: "Toutes" },
  { cle: "en_attente", label: "En attente" },
  { cle: "en_cours", label: "En cours" },
  { cle: "livree", label: "Livrées" },
];

export default function LivraisonsPage() {
  const [filtre, setFiltre] = useState<Filtre>("toutes");
  const [periode, setPeriode] = useState<DateRange | undefined>();

  const liste = useMemo(() => {
    const debut = periode?.from ? startOfDay(periode.from) : null;
    const fin = periode?.from
      ? endOfDay(periode.to ?? periode.from)
      : null;

    return livraisons.filter((l) => {
      if (filtre !== "toutes" && l.statut !== filtre) return false;
      if (debut && fin) {
        const d = parseCreeLe(l.creeLe);
        if (!d || d < debut || d > fin) return false;
      }
      return true;
    });
  }, [filtre, periode]);

  return (
    <div className="animate-rise space-y-5">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight">Livraisons</h1>
        <p className="text-sm text-slate-500">
          {liste.length} commande{liste.length > 1 ? "s" : ""} ·{" "}
          {filtres.find((f) => f.cle === filtre)?.label.toLowerCase()}
        </p>
      </header>

      <DateRangeFilter value={periode} onChange={setPeriode} />

      <div className="scroll-slim -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {filtres.map((f) => (
          <button
            key={f.cle}
            onClick={() => setFiltre(f.cle)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              filtre === f.cle
                ? "bg-secondary text-white"
                : "border border-slate-200 bg-surface text-slate-500 hover:text-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {liste.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-surface py-16 text-center">
          <PackageSearch className="mx-auto h-8 w-8 text-slate-300" />
          <p className="mt-3 font-semibold text-secondary">
            Aucune commande ici
          </p>
          <p className="text-sm text-slate-500">
            Les nouvelles livraisons apparaîtront dans cette liste.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {liste.map((l) => (
            <OrderCard key={l.id} livraison={l} />
          ))}
        </div>
      )}
    </div>
  );
}
