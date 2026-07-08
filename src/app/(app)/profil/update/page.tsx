"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Bike, Check, Mail, MapPin, Phone, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function ModifierProfilPage() {
  const { livreur, majLivreur } = useAuth();
  const router = useRouter();

  const [nom, setNom] = useState(livreur?.nom ?? "");
  const [email, setEmail] = useState(livreur?.email ?? "");
  const [telephone, setTelephone] = useState(livreur?.telephone ?? "");
  const [ville, setVille] = useState(livreur?.ville ?? "");
  const [vehicule, setVehicule] = useState(livreur?.vehicule ?? "");
  const [enregistre, setEnregistre] = useState(false);

  if (!livreur) return null;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const initiales = nom
      .split(" ")
      .map((m) => m[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    majLivreur({ nom, email, telephone, ville, vehicule, initiales });
    setEnregistre(true);
    setTimeout(() => router.push("/profil"), 900);
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
          Modifier le profil
        </h1>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <section className="space-y-4 rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
          <Champ
            icon={User}
            label="Nom complet"
            value={nom}
            onChange={setNom}
            placeholder="Nom et prénom"
          />
          <Champ
            icon={Mail}
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="vous@tchokos.cm"
          />
          <Champ
            icon={Phone}
            label="Téléphone"
            value={telephone}
            onChange={setTelephone}
            placeholder="+237 6 00 00 00 00"
          />
          <Champ
            icon={MapPin}
            label="Ville"
            value={ville}
            onChange={setVille}
            placeholder="Douala"
          />
          <Champ
            icon={Bike}
            label="Véhicule"
            value={vehicule}
            onChange={setVehicule}
            placeholder="Moto — Yamaha"
          />
        </section>

        <section className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-bold text-slate-500">
            Zones affectées (gérées par Tchokos Sarl)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {livreur.zones.map((z) => (
              <span
                key={z}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500"
              >
                {z}
              </span>
            ))}
          </div>
        </section>

        <button
          type="submit"
          disabled={enregistre}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-70"
        >
          {enregistre ? (
            <>
              <Check className="h-4 w-4" /> Enregistré
            </>
          ) : (
            "Enregistrer les modifications"
          )}
        </button>
      </form>
    </div>
  );
}

function Champ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-secondary">{label}</span>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <Icon className="h-4 w-4 text-slate-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-slate-400"
        />
      </div>
    </label>
  );
}
