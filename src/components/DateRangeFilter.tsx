"use client";

import * as React from "react";
import { CalendarDays, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  value?: DateRange;
  onChange: (range?: DateRange) => void;
  className?: string;
}

export default function DateRangeFilter({
  value,
  onChange,
  className,
}: DateRangeFilterProps) {
  const [open, setOpen] = React.useState(false);
  const actif = Boolean(value?.from);

  const label = value?.from
    ? value.to
      ? `${format(value.from, "d MMM", { locale: fr })} — ${format(
          value.to,
          "d MMM yyyy",
          { locale: fr }
        )}`
      : format(value.from, "d MMM yyyy", { locale: fr })
    : "Filtrer par date";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition",
              actif
                ? "bg-secondary text-white"
                : "border border-slate-200 bg-surface text-slate-500 hover:text-secondary"
            )}
          >
            <CalendarDays className="h-4 w-4" />
            <span className="capitalize">{label}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-3">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
          />
          <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onChange(undefined)}
              disabled={!actif}
            >
              Réinitialiser
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Appliquer
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {actif && (
        <button
          onClick={() => onChange(undefined)}
          aria-label="Effacer le filtre de date"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-slate-200 bg-surface text-slate-400 transition hover:text-danger"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
