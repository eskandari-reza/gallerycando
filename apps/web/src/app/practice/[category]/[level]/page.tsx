import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import Runner from "./runner";

const LEVELS = ["easy", "medium", "advanced"] as const;

export default async function LevelPage({
  params,
}: {
  params: Promise<{ category: string; level: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { category, level } = await params;
  const n = Number(category);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (!(LEVELS as readonly string[]).includes(level)) notFound();
  return <Runner category={n} level={level as (typeof LEVELS)[number]} />;
}
