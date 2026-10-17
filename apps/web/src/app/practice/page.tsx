import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PracticeHome from "./practice-home";

export default async function PracticePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <PracticeHome />;
}
