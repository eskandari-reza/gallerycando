import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./auth";
import { scenarios } from "./scenarios";

/**
 * One row per practice attempt. Only attempt_no = 1 counts for score and unlocking;
 * later review rounds (attempt_no >= 2) reuse the same table.
 */
export const attempts = pgTable(
  "attempts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    scenarioId: uuid("scenario_id")
      .notNull()
      .references(() => scenarios.id, { onDelete: "cascade" }),
    attemptNo: integer("attempt_no").notNull().default(1),
    choice: text("choice").notNull(), // 'A' | 'B' | 'SAME'
    rating: text("rating"), // chosen rating, null when SAME
    voteCorrect: boolean("vote_correct").notNull(),
    ratingCorrect: boolean("rating_correct").notNull(),
    score: integer("score").notNull(), // 0..100
    reviewDueAt: timestamp("review_due_at", { withTimezone: true }), // set when the vote was wrong
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("attempts_user_scenario_no_uq").on(t.userId, t.scenarioId, t.attemptNo),
    index("attempts_user_idx").on(t.userId),
  ],
);
