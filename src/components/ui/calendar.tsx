"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={fr}
      showOutsideDays={showOutsideDays}
      className={cn("relative p-1", className)}
      classNames={{
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-3",
        month_caption: "relative flex h-8 items-center justify-center",
        caption_label: "text-sm font-semibold capitalize text-secondary",
        nav: "flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "absolute left-1 top-1 z-10 h-7 w-7 rounded-lg p-0"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "absolute right-1 top-1 z-10 h-7 w-7 rounded-lg p-0"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "w-9 text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400",
        week: "mt-1 flex w-full",
        day: "h-9 w-9 p-0 text-center text-sm",
        day_button:
          "flex h-9 w-9 items-center justify-center rounded-lg font-medium text-secondary transition hover:bg-slate-100",
        range_start:
          "rounded-l-full bg-primary-soft [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary-dark",
        range_end:
          "rounded-r-full bg-primary-soft [&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary-dark",
        range_middle:
          "bg-primary-soft [&>button]:rounded-none [&>button]:text-primary [&>button]:hover:bg-primary-soft",
        selected: "",
        today: "[&>button]:ring-1 [&>button]:ring-inset [&>button]:ring-primary/50",
        outside: "[&>button]:text-slate-300",
        disabled: "[&>button]:text-slate-300 [&>button]:opacity-40 [&>button]:hover:bg-transparent",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...rest} />
          ) : (
            <ChevronRight className="h-4 w-4" {...rest} />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
