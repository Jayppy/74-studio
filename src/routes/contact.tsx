import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { PageHero } from "@/components/SiteChrome";
import { supabase } from "@/integrations/supabase/client";
import { pageHead, SERVICES, SOCIALS, STUDIO_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Start a Project | 74 Studio", "Tell 74 STUDIO about your music video, animation, editing or ad project and request a personalized quote."),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  project_name: z.string().trim().max(200).optional(),
  service: z.enum(SERVICES, { message: "Choose a service" }),
  deadline: z.string().trim().max(100).optional(),
  runtime: z.string().trim().max(100).optional(),
  music_link: z.union([z.literal(""), z.string().trim().url("Enter a full link (https://...)").max(500)]).optional(),
  references_text: z.string().trim().max(2000).optional(),
  description: z.string().trim().min(10, "Tell us a bit more (at least 10 characters)").max(5000),
});

const field = "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-foreground outline-none transition focus:border-primary";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setBusy(true);
    const { error } = await supabase.from("inquiries").insert({ ...parsed.data, music_link: parsed.data.music_link || null });
    setBusy(false);
    if (error) {
      toast.error("Something went wrong sending your inquiry. Please try again or email us directly.");
      return;
    }
    form.reset();
    setSent(true);
    toast.success("Inquiry received. We'll be in touch.");
  }

  const F = ({ name, label, children }: { name: string; label: string; children: React.ReactNode }) => (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {children}
      {errors[name] && <span className="mt-1 block text-sm text-destructive">{errors[name]}</span>}
    </label>
  );

  return (
    <>
      <PageHero eyebrow="Contact" title="Tell us what you're imagining.">
        Whether you're releasing a single, planning an album, or creating promotional content, let's discuss how 74 STUDIO can bring your vision to life.
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-16 px-5 pb-28 lg:grid-cols-[1fr_320px]">
        {sent ? (
          <div className="border border-border p-10">
            <h2 className="text-3xl font-bold uppercase">Thank you.</h2>
            <p className="mt-4 text-muted-foreground">Your inquiry has been received. We review every project personally and will reply to the email you provided.</p>
            <button className="btn-line mt-8" onClick={() => setSent(false)}>Send another inquiry</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
            <F name="name" label="Name *"><input name="name" className={field} autoComplete="name" /></F>
            <F name="email" label="Email *"><input name="email" type="email" className={field} autoComplete="email" /></F>
            <F name="project_name" label="Artist / Project name"><input name="project_name" className={field} /></F>
            <F name="service" label="Service required *">
              <select name="service" className={field} defaultValue="">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </F>
            <F name="deadline" label="Project deadline"><input name="deadline" type="date" className={field} /></F>
            <F name="runtime" label="Desired runtime"><input name="runtime" placeholder="e.g. 3:20" className={field} /></F>
            <div className="sm:col-span-2"><F name="music_link" label="Music link"><input name="music_link" placeholder="https://" className={field} /></F></div>
            <div className="sm:col-span-2"><F name="references_text" label="Creative references"><textarea name="references_text" rows={3} className={field} /></F></div>
            <div className="sm:col-span-2"><F name="description" label="Project description *"><textarea name="description" rows={6} className={field} /></F></div>
            <div className="sm:col-span-2"><button type="submit" disabled={busy} className="btn-chrome disabled:opacity-60">{busy ? "Sending…" : "Request a quote"}</button></div>
          </form>
        )}
        <aside className="space-y-8">
          <div>
            <p className="eyebrow">Email</p>
            <a href={`mailto:${STUDIO_EMAIL}`} className="mt-2 block font-display text-lg hover:text-chrome">{STUDIO_EMAIL}</a>
          </div>
          <div>
            <p className="eyebrow">Find us</p>
            <ul className="mt-3 space-y-2">
              {SOCIALS.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer" className="font-display uppercase hover:text-chrome">{s.label} ↗</a></li>)}
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}
