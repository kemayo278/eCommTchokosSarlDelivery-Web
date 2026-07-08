"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Check, Eye, EyeOff, Lock } from "lucide-react";
import { identifiantsDemo } from "@/lib/data";

export default function MotDePassePage() {
  const router = useRouter();

  const [actuel, setActuel] = useState("");
  const [nouveau, setNouveau] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [voir, setVoir] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [succes, setSucces] = useState(false);

  const regles = [
    { ok: nouveau.length >= 8, texte: "Au moins 8 caractères" },
    { ok: /[0-9]/.test(nouveau), texte: "Au moins un chiffre" },
    { ok: nouveau === confirmation && nouveau.length > 0, texte: "Les deux mots de passe correspondent" },
  ];

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);

    if (actuel !== identifiantsDemo.motDePasse) {
      setErreur("Le mot de passe actuel est incorrect.");
      return;
    }
    if (!regles.every((r) => r.ok)) {
      setErreur("Le nouveau mot de passe ne respecte pas les critères.");
      return;
    }

    setSucces(true);
    setTimeout(() => router.push("/parametres"), 1100);
  }

  return (
    <div className="animate-rise space-y-5">
      <header className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-surface text-slate-600 transition hover:text-secondary"
          aria-label="Retour"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-extrabold tracking-tight">
          Changer le mot de passe
        </h1>
      </header>

      {succes ? (
        <div className="rounded-[var(--radius-card)] border border-primary/20 bg-primary-soft p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
            <Check className="h-6 w-6" />
          </div>
          <p className="mt-3 font-bold text-secondary">Mot de passe mis à jour</p>
          <p className="text-sm text-slate-600">
            Utilisez votre nouveau mot de passe à la prochaine connexion.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <section className="space-y-4 rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
            <ChampMdp
              label="Mot de passe actuel"
              value={actuel}
              onChange={setActuel}
              voir={voir}
            />
            <ChampMdp
              label="Nouveau mot de passe"
              value={nouveau}
              onChange={setNouveau}
              voir={voir}
            />
            <ChampMdp
              label="Confirmer le mot de passe"
              value={confirmation}
              onChange={setConfirmation}
              voir={voir}
            />

            <button
              type="button"
              onClick={() => setVoir((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-secondary"
            >
              {voir ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" /> Masquer les mots de passe
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Afficher les mots de passe
                </>
              )}
            </button>
          </section>

          <ul className="space-y-1.5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            {regles.map((r, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 text-sm ${
                  r.ok ? "text-primary-dark" : "text-slate-400"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full ${
                    r.ok ? "bg-primary text-white" : "border border-slate-300"
                  }`}
                >
                  {r.ok && <Check className="h-2.5 w-2.5" />}
                </span>
                {r.texte}
              </li>
            ))}
          </ul>

          {erreur && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger">
              {erreur}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
          >
            Mettre à jour le mot de passe
          </button>
        </form>
      )}
    </div>
  );
}

function ChampMdp({
  label,
  value,
  onChange,
  voir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  voir: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-secondary">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Lock className="h-4 w-4 text-slate-400" />
        <input
          type={voir ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}
