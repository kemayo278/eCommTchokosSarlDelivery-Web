"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Bell,
  ChevronRight,
  Globe,
  HelpCircle,
  Lock,
  Moon,
  Power,
  Volume2,
} from "lucide-react";

function Toggle({
  actif,
  onChange,
}: {
  actif: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={actif}
      onClick={() => onChange(!actif)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        actif ? "bg-primary" : "bg-slate-200"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
          actif ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function ParametresPage() {
  const [dispo, setDispo] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [son, setSon] = useState(true);
  const [sombre, setSombre] = useState(false);

  return (
    <div className="animate-rise space-y-5">
      <h1 className="text-2xl font-extrabold tracking-tight">Réglages</h1>

      <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                dispo
                  ? "bg-primary-soft text-primary-dark"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              <Power className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold text-secondary">
                {dispo ? "Disponible" : "Hors ligne"}
              </p>
              <p className="text-sm text-slate-500">
                {dispo
                  ? "Vous recevez de nouvelles courses."
                  : "Vous ne recevez pas de courses."}
              </p>
            </div>
          </div>
          <Toggle actif={dispo} onChange={setDispo} />
        </div>
      </section>

      <Groupe titre="Notifications">
        <RangeeToggle
          icon={Bell}
          label="Notifications push"
          desc="Alertes de nouvelles livraisons"
          actif={notifs}
          onChange={setNotifs}
        />
      </Groupe>

      <Groupe titre="Préférences">
        <RangeeLien icon={Globe} label="Langue" valeur="Français" />
      </Groupe>

      <Groupe titre="Compte & sécurité">
        <RangeeLien
          icon={Lock}
          label="Mot de passe"
          valeur="Modifier"
          href="/settings/change-password"
        />
        <RangeeLien
          icon={HelpCircle}
          label="Aide & support"
          valeur=""
          href="/settings/help"
        />
      </Groupe>

      <p className="pt-2 text-center text-xs text-slate-400">
        Tchokos Sarl · Espace livreur · v1.0.0
      </p>
    </div>
  );
}

function Groupe({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-card)] border border-slate-100 bg-surface p-2">
      <h2 className="px-3 py-2 text-sm font-bold text-slate-500">{titre}</h2>
      <div className="divide-y divide-slate-50">{children}</div>
    </section>
  );
}

function RangeeToggle({
  icon: Icon,
  label,
  desc,
  actif,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  actif: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-secondary">{label}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
      <Toggle actif={actif} onChange={onChange} />
    </div>
  );
}

function RangeeLien({
  icon: Icon,
  label,
  valeur,
  href,
}: {
  icon: React.ElementType;
  label: string;
  valeur: string;
  href?: string;
}) {
  const contenu = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        <Icon className="h-4 w-4" />
      </span>
      <p className="flex-1 text-sm font-semibold text-secondary">{label}</p>
      {valeur && <span className="text-sm text-slate-400">{valeur}</span>}
      <ChevronRight className="h-4 w-4 text-slate-300" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex w-full items-center gap-3 px-3 py-3">
        {contenu}
      </Link>
    );
  }

  return (
    <button className="flex w-full items-center gap-3 px-3 py-3 text-left">
      {contenu}
    </button>
  );
}
