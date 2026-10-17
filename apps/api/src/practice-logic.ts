// Pure scoring and unlocking rules for the practice area (no database access).

export type Choice = "A" | "B" | "SAME";
export type Rating = "much_better" | "better" | "slightly_better" | "about_the_same";
export type LevelKey = "easy" | "medium" | "advanced";

export const LEVELS: LevelKey[] = ["easy", "medium", "advanced"];
export const VOTE_POINTS = 85;
export const RATING_POINTS = 15;
export const UNLOCK_MIN_ATTEMPTS = 10; // attempts needed in a level before the next one can open
export const UNLOCK_MIN_AVG_SCORE = 70; // average score (0..100) needed in that level
export const REVIEW_AFTER_DAYS = 7;

export function scoreAttempt(
  scenario: { correct: Choice; rating: Rating },
  answer: { choice: Choice; rating?: Rating | null },
) {
  const voteCorrect = answer.choice === scenario.correct;
  let ratingCorrect = false;
  if (voteCorrect) {
    ratingCorrect = scenario.correct === "SAME" ? true : answer.rating === scenario.rating;
  }
  const votePoints = voteCorrect ? VOTE_POINTS : 0;
  const ratingPoints = voteCorrect && ratingCorrect ? RATING_POINTS : 0;
  return { voteCorrect, ratingCorrect, votePoints, ratingPoints, score: votePoints + ratingPoints };
}

export type LevelCounts = { total: number; done: number; scoreSum: number };
export type LevelStat = LevelCounts & {
  avgScore: number | null;
  passed: boolean;
  unlocked: boolean;
};

export function computeLevels(counts: Record<LevelKey, LevelCounts>): Record<LevelKey, LevelStat> {
  const base = (c: LevelCounts) => {
    const needed = Math.min(UNLOCK_MIN_ATTEMPTS, c.total);
    const avgScore = c.done > 0 ? c.scoreSum / c.done : null;
    const passed = c.total > 0 && c.done >= needed && avgScore !== null && avgScore >= UNLOCK_MIN_AVG_SCORE;
    return { ...c, avgScore, passed };
  };
  const easy = base(counts.easy);
  const medium = base(counts.medium);
  const advanced = base(counts.advanced);
  return {
    easy: { ...easy, unlocked: true },
    medium: { ...medium, unlocked: easy.passed },
    advanced: { ...advanced, unlocked: easy.passed && medium.passed },
  };
}
