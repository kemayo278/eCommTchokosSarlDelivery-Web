import Link from "next/link";
import { MapPin, Package, User } from "lucide-react";
import { formatFCFA } from "@/lib/data";
import type { Livraison } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function OrderCard({ livraison }: { livraison: Livraison }) {
  return (
    <Link
      href={`/livraisons/${livraison.id}`}
      className="block rounded-2xl border border-slate-100 bg-surface p-4 transition hover:border-primary/40 hover:shadow-[0_8px_30px_-12px_rgba(16,185,129,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold tracking-tight">{livraison.numero}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
            <Package className="h-3.5 w-3.5" />
            {livraison.nbArticles} article{livraison.nbArticles > 1 ? "s" : ""} · {livraison.creeLe}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-secondary">{formatFCFA(livraison.montant)}</p>
          <div className="mt-1.5">
            <StatusBadge statut={livraison.statut} />
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-dashed border-slate-100 pt-3">
        <p className="flex items-center gap-1.5 text-sm font-medium text-secondary">
          <User className="h-3.5 w-3.5 text-slate-400" />
          {livraison.client.nom}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
          <MapPin className="h-3.5 w-3.5 text-slate-400" />
          {livraison.client.quartier}, Douala
        </p>
      </div>
    </Link>
  );
}
