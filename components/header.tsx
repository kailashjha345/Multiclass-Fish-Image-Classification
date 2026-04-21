"use client";

import { Fish } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
          <Fish className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Fish Classification
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-Powered Species Identifier
          </p>
        </div>
      </div>
    </header>
  );
}
