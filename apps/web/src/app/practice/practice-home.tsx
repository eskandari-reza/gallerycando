"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANG, LEVEL_LABELS, api, categoryTitle } from "@/lib/api";
import type { CategoryOverview, LevelKey } from "@/lib/api";

const LEVEL_ORDER: LevelKey[] = ["easy", "medium", "advanced"];

const TRACKS: { id: string; title: string; hint: string }[] = [
  { id: "skills", title: "مهارت‌های ارزیابی", hint: "تشخیص خطا، استدلال و ساختار پاسخ" },
  { id: "topics", title: "موضوعات تخصصی", hint: "ارزیابی پاسخ‌ها در حوزه‌های مختلف دانش" },
];

export default function PracticeHome() {
  const [cats, setCats] = useState<CategoryOverview[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<CategoryOverview[]>(`/practice/categories?lang=${LANG}`)
      .then(setCats)
      .catch((e) => setError(e instanceof Error ? e.message : "خطای ناشناخته"));
  }, []);

  return (
    <main dir="rtl" className="mx-auto max-w-5xl space-y-8 p-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">تمرین ارزیابی</h1>
        <Link href="/dashboard" className="text-sm text-muted-foreground hover:underline">
          بازگشت به داشبورد
        </Link>
      </div>

      {error && <p className="text-destructive">{error}</p>}
      {!cats && !error && <p className="text-muted-foreground">در حال بارگذاری...</p>}

      {cats &&
        TRACKS.map((track) => {
          const list = cats.filter((c) => c.track === track.id);
          if (!list.length) return null;
          return (
            <section key={track.id} className="space-y-3">
              <div>
                <h2 className="text-lg font-semibold">{track.title}</h2>
                <p className="text-sm text-muted-foreground">{track.hint}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c) => {
                  const total = LEVEL_ORDER.reduce((s, l) => s + c.levels[l].total, 0);
                  const done = LEVEL_ORDER.reduce((s, l) => s + c.levels[l].done, 0);
                  const pct = total ? Math.round((done / total) * 100) : 0;
                  return (
                    <Link key={c.number} href={`/practice/${c.number}`}>
                      <Card className="h-full transition-shadow hover:shadow-md">
                        <CardHeader>
                          <CardTitle className="text-base">{categoryTitle(c)}</CardTitle>
                          <p dir="ltr" className="text-start text-xs text-muted-foreground">
                            {c.nameEn}
                          </p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            {LEVEL_ORDER.map((l) => (
                              <span key={l}>
                                {LEVEL_LABELS[l]} {c.levels[l].done}/{c.levels[l].total}
                                {c.levels[l].unlocked ? "" : " 🔒"}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
    </main>
  );
}
