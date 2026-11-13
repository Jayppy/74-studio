import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Studio admin | 74 Studio" }, { name: "description", content: "Manage blog articles and project inquiries." }, { property: "og:title", content: "Studio admin" }, { property: "og:description", content: "Manage blog articles." }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Post = Tables<"posts">;
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

function Admin() {
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"posts" | "inquiries">("posts");
  const [editing, setEditing] = useState<Partial<Post> | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { setIsAdmin(false); return; }
      const { data: ok } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
      setIsAdmin(!!ok);
    });
  }, []);

  const posts = useQuery({ queryKey: ["admin-posts"], enabled: !!isAdmin, queryFn: async () => {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (error) throw error; return data;
  }});
  const inquiries = useQuery({ queryKey: ["admin-inquiries"], enabled: !!isAdmin && tab === "inquiries", queryFn: async () => {
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (error) throw error; return data;
  }});

  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    window.location.replace("/auth");
  }

  async function save(publish: boolean) {
    if (!editing?.title?.trim()) { toast.error("Add a title"); return; }
    const row = {
      title: editing.title.trim(),
      slug: slugify(editing.slug || editing.title),
      excerpt: editing.excerpt ?? "",
      content: editing.content ?? "",
      cover_url: editing.cover_url || null,
      published: publish,
      published_at: publish ? editing.published_at ?? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };
    const res = editing.id ? await supabase.from("posts").update(row).eq("id", editing.id) : await supabase.from("posts").insert(row);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(publish ? "Article published" : "Draft saved");
    setEditing(null);
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
    qc.invalidateQueries({ queryKey: ["posts"] });
  }

  async function remove(id: string) {
    if (!confirm("Delete this article permanently?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["admin-posts"] });
  }

  const field = "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 outline-none focus:border-primary";

  if (isAdmin === null) return <p className="mx-auto max-w-5xl px-5 py-24 text-muted-foreground">Loading…</p>;
  if (!isAdmin) return (
    <section className="mx-auto max-w-xl px-5 py-24">
      <h1 className="text-3xl font-bold uppercase">No admin access</h1>
      <p className="mt-4 text-muted-foreground">This account isn't the studio admin.</p>
      <button className="btn-line mt-8" onClick={signOut}>Sign out</button>
    </section>
  );

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold uppercase">Studio admin</h1>
        <button className="btn-line" onClick={signOut}>Sign out</button>
      </div>
      <div className="mt-8 flex gap-2">
        {(["posts", "inquiries"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${tab === t ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
            {t === "posts" ? "Blog articles" : "Project inquiries"}
          </button>
        ))}
      </div>

      {tab === "posts" && (editing ? (
        <div className="mt-10 space-y-5">
          <label className="block"><span className="eyebrow">Title</span><input className={field} value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></label>
          <label className="block"><span className="eyebrow">URL slug (optional)</span><input className={field} value={editing.slug ?? ""} placeholder={slugify(editing.title ?? "")} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></label>
          <label className="block"><span className="eyebrow">Short summary</span><textarea rows={2} className={field} value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} /></label>
          <label className="block"><span className="eyebrow">Cover image link (optional)</span><input className={field} placeholder="https://" value={editing.cover_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} /></label>
          <label className="block"><span className="eyebrow">Article — blank line between paragraphs, start a line with "## " for a heading</span><textarea rows={16} className={field} value={editing.content ?? ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} /></label>
          <div className="flex flex-wrap gap-3">
            <button className="btn-chrome" onClick={() => save(true)}>Publish</button>
            <button className="btn-line" onClick={() => save(false)}>Save as draft</button>
            <button className="btn-line" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="mt-10">
          <button className="btn-chrome" onClick={() => setEditing({})}>New article</button>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {posts.data?.length === 0 && <li className="py-6 text-muted-foreground">No articles yet.</li>}
            {posts.data?.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-4 py-5">
                <div>
                  <p className="font-display text-lg font-semibold">{p.title}</p>
                  <p className="eyebrow mt-1">{p.published ? "Published" : "Draft"} · /blog/{p.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-line" onClick={() => setEditing(p)}>Edit</button>
                  <button className="btn-line" onClick={() => remove(p.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {tab === "inquiries" && (
        <ul className="mt-10 space-y-6">
          {inquiries.data?.length === 0 && <li className="text-muted-foreground">No inquiries yet.</li>}
          {inquiries.data?.map((q) => (
            <li key={q.id} className="border border-border p-6">
              <div className="flex flex-wrap justify-between gap-2">
                <p className="font-display text-lg font-semibold">{q.name} · <a className="hover:text-chrome" href={`mailto:${q.email}`}>{q.email}</a></p>
                <p className="eyebrow">{new Date(q.created_at).toLocaleString()}</p>
              </div>
              <p className="eyebrow mt-2">{q.service}{q.project_name ? ` · ${q.project_name}` : ""}{q.deadline ? ` · due ${q.deadline}` : ""}{q.runtime ? ` · ${q.runtime}` : ""}</p>
              <p className="mt-4 whitespace-pre-line">{q.description}</p>
              {q.music_link && <a href={q.music_link} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-chrome underline">{q.music_link}</a>}
              {q.references_text && <p className="mt-2 text-sm text-muted-foreground">{q.references_text}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
