"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANG, LEVEL_LABELS, api, categoryTitle } from "@/lib/api";
import type { CategoryOverview, LevelKey } from "@/lib/api";

const LEVEL_ORDER: LevelKey[] = ["easy", "medium", "advanced"];
const MIN_ATTEMPTS = 10;
const MIN_AVG = 70;

// Explains what is still missing before a level opens.
function lockReason(level: LevelKey, c: CategoryOverview): string {
  const need = (prev: LevelKey) => {
    const p = c.levels[prev];
    const needed = Math.min(MIN_ATTEMPTS, p.total);
    if (p.done < needed) return `هنوز ${needed - p.done} سناریو در سطح «${LEVEL_LABELS[prev]}» باقی مانده است.`;
    return `میانگین نمره‌ی سطح «${LEVEL_LABELS[prev]}» باید حداقل ${MIN_AVG} باشد (فعلاً ${Math.round(p.avgScore ?? 0)}).`;
  };
  if (level === "medium") return need("easy");
  if (!c.levels.easy.passed) return need("easy");
  return need("medium");
}

export default function CategoryView({ number }: { number: number }) {
  const [cat, setCat] = useState<CategoryOverview | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<CategoryOverview>(`/practice/categories/${number}?lang=${LANG}`)
      .then(setCat)
      .catch((e) => setError(e instanceof Error ? e.message : "خطای ناشناخته"));
  }, [number]);

  return (
    <main dir="rtl" className="mx-auto max-w-3xl space-y-6 p-4 py-10">
      <Link href="/practice" className="text-sm text-muted-foreground hover:underline">
        ← همه‌ی دسته‌ها
      </Link>

      {error && <p className="text-destructive">{error}</p>}
      {!cat && !error && <p className="text-muted-foreground">در حال بارگذاری...</p>}

      {cat && (
        <>
          <div>
            <h1 className="text-2xl font-bold">{categoryTitle(cat)}</h1>
            <p dir="ltr" className="text-start text-sm text-muted-foreground">
              {cat.nameEn}
            </p>
          </div>

          <div className="space-y-4">
            {LEVEL_ORDER.map((l) => {
              const s = cat.levels[l];
              const finished = s.total > 0 && s.done >= s.total;
              const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
              return (
                <Card key={l} className={s.unlocked ? "" : "opacity-70"}>
                  <CardHeader className="flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-lg">
                      {LEVEL_LABELS[l]} {s.unlocked ? "" : "🔒"}
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                      {s.done} از {s.total}
                      {s.avgScore !== null && ` · میانگین ${Math.round(s.avgScore)}`}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    {s.unlocked ? (
                      finished ? (
                        <p className="text-sm text-muted-foreground">همه‌ی سناریوهای این سطح انجام شد ✅</p>
                      ) : (
                        <Button asChild>
                          <Link href={`/practice/${cat.number}/${l}`}>{s.done === 0 ? "شروع" : "ادامه"}</Link>
                        </Button>
                      )
                    ) : (
                      <p className="text-sm text-muted-foreground">{lockReason(l, cat)}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}
