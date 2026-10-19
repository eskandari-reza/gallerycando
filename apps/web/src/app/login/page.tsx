import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const isDev = process.env.AUTH_MODE === "dev";

  async function credentialsLogin(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/dashboard",
      });
    } catch (err) {
      if (err instanceof AuthError) {
        redirect("/login?error=invalid");
      }
      throw err;
    }
  }

  async function googleLogin() {
    "use server";
    await signIn("google", { redirectTo: "/dashboard" });
  }

  return (
    <main className="mx-auto flex max-w-md items-center px-4 py-12">
      <Card className="sticker-card w-full">
        <CardHeader className="items-center gap-2 text-center">
          <Logo size={44} />
          <CardDescription>Better AI through human feedback</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <p className="rounded-2xl bg-destructive/10 p-3 text-sm text-destructive">Invalid email or password.</p>
          )}

          {isDev && (
            <form action={credentialsLogin} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required autoComplete="current-password" />
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          )}

          <form action={googleLogin}>
            <Button type="submit" variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
