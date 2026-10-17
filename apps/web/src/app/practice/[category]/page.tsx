import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import CategoryView from "./category-view";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  const { category } = await params;
  const n = Number(category);
  if (!Number.isInteger(n) || n < 1) notFound();
  return <CategoryView number={n} />;
}
