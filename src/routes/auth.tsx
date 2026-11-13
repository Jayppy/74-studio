import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Studio sign in | 74 Studio" }, { name: "description", content: "Admin sign in for 74 STUDIO." }, { property: "og:title", content: "Studio sign in" }, { property: "og:description", content: "Admin sign in for 74 STUDIO." }, { name: "robots", content: "noindex" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const field = "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 outline-none focus:border-primary";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")), password = String(fd.get("password"));
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) { toast.error(error.message); return; }
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
      setBusy(false);
      if (error) { toast.error(error.message); return; }
      toast.success("Check your email to confirm your account, then sign in.");
      setMode("in");
    }
  }

  return (
    <section className="mx-auto max-w-md px-5 py-24">
      <p className="eyebrow">Studio admin</p>
      <h1 className="mt-3 text-4xl font-bold uppercase">{mode === "in" ? "Sign in" : "Create admin account"}</h1>
      <form onSubmit={submit} className="mt-10 space-y-5">
        <label className="block"><span className="eyebrow">Email</span><input name="email" type="email" required className={field} /></label>
        <label className="block"><span className="eyebrow">Password</span><input name="password" type="password" minLength={8} required className={field} /></label>
        <button disabled={busy} className="btn-chrome w-full">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</button>
      </form>
      <button className="mt-6 text-sm text-muted-foreground hover:text-foreground" onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "First time? Create the admin account" : "Already have an account? Sign in"}
      </button>
    </section>
  );
}
