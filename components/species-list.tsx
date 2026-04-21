"use client";

import { CLASS_NAMES } from "@/lib/classifier";

export function SpeciesList() {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-medium text-foreground mb-3">
        Supported Species
      </h3>
      <div className="flex flex-wrap gap-2">
        {CLASS_NAMES.map((name) => (
          <span
            key={name}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
