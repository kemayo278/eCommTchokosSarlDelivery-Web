import { libelleStatut } from "@/lib/data";
import type { StatutLivraison } from "@/lib/types";

const styles: Record<StatutLivraison, string> = {
  en_attente: "bg-warn-soft text-warn",
  en_cours: "bg-primary-soft text-primary-dark",
  livree: "bg-primary-soft text-primary-dark",
  annulee: "bg-danger-soft text-danger",
};

const dot: Record<StatutLivraison, string> = {
  en_attente: "bg-warn",
  en_cours: "bg-primary",
  livree: "bg-primary-dark",
  annulee: "bg-danger",
};

export default function StatusBadge({ statut }: { statut: StatutLivraison }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${styles[statut]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot[statut]}`} />
      {libelleStatut[statut]}
    </span>
  );
}
