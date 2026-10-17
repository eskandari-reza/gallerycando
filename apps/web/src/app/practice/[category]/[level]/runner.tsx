"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError, LANG, LEVEL_LABELS, api } from "@/lib/api";
import type { LevelKey, NextResponse, Reveal } from "@/lib/api";

type Choice = "A" | "B" | "SAME";
type Rating = "much_better" | "better" | "slightly_better";

const RATING_LABELS: Record<string, string> = {
  much_better: "خیلی بهتر (Much Better)",
  better: "بهتر (Better)",
  slightly_better: "کمی بهتر (Slightly Better)",
  about_the_same: "تقریباً برابر (About the Same)",
};

const CHOICE_LABELS: Record<Choice, string> = {
  A: "پاسخ A بهتر است",
  B: "پاسخ B بهتر است",
  SAME: "هر دو تقریباً برابرند",
};

const TOGGLE_KEY = "practice_show_translation";

export default function Runner({ category, level }: { category: number; level: LevelKey }) {
  const [data, setData] = useState<NextResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);

  const [choice, setChoice] = useState<Choice | null>(null);
  const [rating, setRating] = useState<Rating | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reveal, setReveal] = useState<Reveal | null>(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem(TOGGLE_KEY);
      if (v !== null) setShowTranslation(v === "1");
    } catch {
      /* ignore */
    }
  }, []);

  function toggleTranslation() {
    const next = !showTranslation;
    setShowTranslation(next);
    try {
      localStorage.setItem(TOGGLE_KEY, next ? "1" : "0");
    } catch {
      /* ignore */
    }
  }

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    setChoice(null);
    setRating(null);
    setReveal(null);
    try {
      const res = await api<NextResponse>(`/practice/next?category=${category}&level=${level}&lang=${LANG}`);
      setData(res);
    } catch (e) {
      if (e instanceof ApiError && e.status === 403) setLocked(true);
      else setError(e instanceof Error ? e.message : "خطای ناشناخته");
    } finally {
      setLoading(false);
    }
  }, [category, level]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit() {
    if (!data?.scenario || !choice || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await api<Reveal>("/practice/attempts", {
        scenarioId: data.scenario.id,
        choice,
        rating: choice === "SAME" ? undefined : rating,
        lang: LANG,
      });
      setReveal(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "خطای ناشناخته");
    } finally {
      setSubmitting(false);
    }
  }

  const back = (
    <Link href={`/practice/${category}`} className="text-sm text-muted-foreground hover:underline">
      ← بازگشت به دسته
    </Link>
  );

  if (locked) {
    return (
      <main dir="rtl" className="mx-auto max-w-3xl space-y-4 p-4 py-10">
        {back}
        <p>این سطح هنوز باز نشده است. ابتدا سطح قبلی را کامل کن.</p>
      </main>
    );
  }

  const sc = data?.scenario;
  const tr = sc?.translation ?? null;
  const canSubmit = !!choice && (choice === "SAME" || !!rating) && !submitting && !reveal;

  return (
    <main dir="rtl" className="mx-auto max-w-4xl space-y-5 p-4 py-10">
      <div className="flex items-center justify-between">
        {back}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>سطح {LEVEL_LABELS[level]}</span>
          {data && <span>{Math.min(data.progress.done + (data.done ? 0 : 1), data.progress.total)} از {data.progress.total}</span>}
          <Button type="button" variant="outline" size="sm" onClick={toggleTranslation}>
            {showTranslation ? "پنهان کردن ترجمه" : "نمایش ترجمه"}
          </Button>
        </div>
      </div>

      {loading && <p className="text-muted-foreground">در حال بارگذاری...</p>}
      {error && <p className="text-destructive">{error}</p>}

      {data?.done && !loading && (
        <Card>
          <CardContent className="space-y-3 py-10 text-center">
            <p>🎉 همه‌ی سناریوهای این سطح را انجام دادی.</p>
            <Button asChild>
              <Link href={`/practice/${category}`}>بازگشت به دسته</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {sc && !loading && (
        <div key={sc.id} className="space-y-4">
          {showTranslation && tr?.title && <p className="text-sm text-muted-foreground">{tr.title}</p>}

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-base">پرسش (Prompt)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p dir="ltr" className="whitespace-pre-wrap text-start">{sc.promptEn}</p>
              {showTranslation && tr?.prompt && (
                <p dir="rtl" className="whitespace-pre-wrap border-t border-border pt-2 text-sm text-muted-foreground">
                  {tr.prompt}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {(
              [
                ["A", sc.responseAEn, tr?.responseA],
                ["B", sc.responseBEn, tr?.responseB],
              ] as const
            ).map(([k, en, fa]) => (
              <Card key={k}>
                <CardHeader>
                  <CardTitle className="text-base">پاسخ {k}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p dir="ltr" className="whitespace-pre-wrap text-start">{en}</p>
                  {showTranslation && fa && (
                    <p dir="rtl" className="whitespace-pre-wrap border-t border-border pt-2 text-sm text-muted-foreground">
                      {fa}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {!reveal && (
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="mb-2 text-sm font-medium">کدام پاسخ بهتر است؟</p>
                  <div className="flex flex-wrap gap-2">
                    {(["A", "B", "SAME"] as Choice[]).map((c) => (
                      <Button
                        key={c}
                        type="button"
                        variant={choice === c ? "default" : "outline"}
                        onClick={() => {
                          setChoice(c);
                          if (c === "SAME") setRating(null);
                        }}
                      >
                        {CHOICE_LABELS[c]}
                      </Button>
                    ))}
                  </div>
                </div>

                {(choice === "A" || choice === "B") && (
                  <div>
                    <p className="mb-2 text-sm font-medium">چقدر بهتر است؟</p>
                    <div className="flex flex-wrap gap-2">
                      {(["much_better", "better", "slightly_better"] as Rating[]).map((r) => (
                        <Button
                          key={r}
                          type="button"
                          variant={rating === r ? "default" : "outline"}
                          onClick={() => setRating(r)}
                        >
                          {RATING_LABELS[r]}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Button type="button" disabled={!canSubmit} onClick={submit}>
                  {submitting ? "در حال ثبت..." : "ثبت پاسخ"}
                </Button>
              </CardContent>
            </Card>
          )}

          {reveal && (
            <Card>
              <CardHeader>
                <CardTitle className={reveal.voteCorrect ? "text-base" : "text-base text-destructive"}>
                  {reveal.voteCorrect ? "✅ رأی درست بود" : "❌ رأی درست نبود"} · نمره: {reveal.score} از 100
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm">
                  <p>
                    پاسخ مرجع:{" "}
                    <strong>
                      {reveal.reference.correct === "SAME"
                        ? CHOICE_LABELS.SAME
                        : `${CHOICE_LABELS[reveal.reference.correct]} · ${RATING_LABELS[reveal.reference.rating] ?? reveal.reference.rating}`}
                    </strong>
                  </p>
                  <p className="text-muted-foreground">
                    رأی {reveal.breakdown.vote.earned}/{reveal.breakdown.vote.max} · سطح برتری {reveal.breakdown.rating.earned}/
                    {reveal.breakdown.rating.max}
                  </p>
                  {reveal.voteCorrect && !reveal.ratingCorrect && (
                    <p className="text-muted-foreground">سطح برتری را متفاوت از مرجع انتخاب کردی.</p>
                  )}
                  {!reveal.voteCorrect && <p className="text-muted-foreground">این سناریو بعد از ۷ روز برای مرور برمی‌گردد.</p>}
                </div>

                <section className="space-y-1">
                  <h3 className="font-semibold">تحلیل</h3>
                  {reveal.analysis.en && <p dir="ltr" className="whitespace-pre-wrap text-start">{reveal.analysis.en}</p>}
                  {(showTranslation || !reveal.analysis.en) && reveal.analysis.translation && (
                    <p dir="rtl" className="whitespace-pre-wrap text-sm">{reveal.analysis.translation}</p>
                  )}
                  {!reveal.analysis.en && (
                    <p className="text-xs text-muted-foreground">تحلیل فعلاً فقط به زبان ترجمه (فارسی) موجود است.</p>
                  )}
                </section>

                <section className="space-y-1">
                  <h3 className="font-semibold">نمونه‌ی توجیه (Justification)</h3>
                  <p dir="ltr" className="whitespace-pre-wrap text-start">{reveal.justification.en}</p>
                  {showTranslation && reveal.justification.translation && (
                    <p dir="rtl" className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {reveal.justification.translation}
                    </p>
                  )}
                </section>

                {(reveal.verification.en || reveal.verification.translation) && (
                  <section className="space-y-1">
                    <h3 className="font-semibold">راستی‌آزمایی</h3>
                    {reveal.verification.en && <p dir="ltr" className="whitespace-pre-wrap text-start">{reveal.verification.en}</p>}
                    {reveal.verification.translation && (
                      <p dir="rtl" className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {reveal.verification.translation}
                      </p>
                    )}
                  </section>
                )}

                <Button type="button" onClick={load}>
                  سناریوی بعدی
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </main>
  );
}
