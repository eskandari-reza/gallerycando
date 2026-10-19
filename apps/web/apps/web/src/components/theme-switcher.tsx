"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "aurora", label: "Aurora", swatch: "linear-gradient(135deg,#ff8cc4,#b79cff)" },
  { id: "nebula", label: "Nebula", swatch: "linear-gradient(135deg,#6a4cff,#1b1535)" },
  { id: "light", label: "Light", swatch: "linear-gradient(135deg,#8ccfff,#b8f3ea)" },
] as const;

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("aurora");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme ?? "aurora");
  }, []);

  function choose(id: string) {
    document.documentElement.dataset.theme = id;
    try {
      localStorage.setItem("theme", id);
    } catch {
      /* storage may be blocked */
    }
    setTheme(id);
  }

  return (
    <div dir="ltr" className="flex items-center gap-1.5" role="group" aria-label="تم سایت">
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          title={t.label}
          aria-label={t.label}
          aria-pressed={theme === t.id}
          onClick={() => choose(t.id)}
          style={{ background: t.swatch }}
          className={
            "size-7 rounded-full border-2 border-card transition-transform hover:scale-110 " +
            (theme === t.id ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "")
          }
        />
      ))}
    </div>
  );
}
