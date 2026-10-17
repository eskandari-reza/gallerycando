export const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
// Language of the translation fields requested from the API (UI language switching comes later).
export const LANG = "fa";

export type LevelKey = "easy" | "medium" | "advanced";

export type LevelStat = {
  total: number;
  done: number;
  scoreSum: number;
  avgScore: number | null;
  passed: boolean;
  unlocked: boolean;
};

export type CategoryOverview = {
  number: number;
  nameEn: string;
  nameTranslation: string | null;
  track: string;
  levels: Record<LevelKey, LevelStat>;
};

export type PracticeScenario = {
  id: string;
  code: string;
  level: LevelKey;
  promptEn: string;
  responseAEn: string;
  responseBEn: string;
  translation: {
    lang: string;
    title: string | null;
    prompt: string | null;
    responseA: string | null;
    responseB: string | null;
  } | null;
};

export type NextResponse = {
  done: boolean;
  progress: { done: number; total: number };
  scenario?: PracticeScenario;
};

export type Reveal = {
  voteCorrect: boolean;
  ratingCorrect: boolean;
  score: number;
  breakdown: { vote: { earned: number; max: number }; rating: { earned: number; max: number } };
  reference: { correct: "A" | "B" | "SAME"; rating: string };
  analysis: { en: string | null; translation: string | null; lang: string };
  justification: { en: string; translation: string | null };
  verification: { en: string | null; translation: string | null };
};

export const LEVEL_LABELS: Record<LevelKey, string> = {
  easy: "آسان",
  medium: "متوسط",
  advanced: "پیشرفته",
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: body === undefined ? "GET" : "POST",
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (res.status === 401) {
    window.location.href = "/login";
    throw new ApiError(401, "unauthorized");
  }
  if (!res.ok) {
    let msg = `خطای سرور (${res.status})`;
    try {
      const j = await res.json();
      if (j?.message) msg = Array.isArray(j.message) ? j.message.join(", ") : String(j.message);
    } catch {
      /* keep default message */
    }
    throw new ApiError(res.status, msg);
  }
  return res.json() as Promise<T>;
}

export function categoryTitle(c: Pick<CategoryOverview, "nameTranslation" | "nameEn">): string {
  return c.nameTranslation ?? c.nameEn;
}
