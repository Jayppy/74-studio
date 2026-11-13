import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { CATEGORY_LABELS, PROJECTS, type Category } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/portfolio")({
  staticData: { sitemap: true },
  head: () => pageHead("Portfolio: Music Videos, 3D Animation & Edits | 74 Studio", "Watch 3D music videos, visualizers, animated visuals, video edits and ad work produced by 74 Studio.", "/portfolio"),
  component: Portfolio,
});

const FILTERS: ("All" | Category)[] = ["All", "AI", "2D", "3D", "Lyric", "Editing", "UGC"];

function Portfolio() {
  const [f, setF] = useState<"All" | Category>("All");
  const list = f === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === f);
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Selected works">
        A collection of visuals, stories, and creative experiments produced at 74 STUDIO.
        <p className="mt-4 text-base">
          Browse our <Link to="/music-videos" className="text-foreground underline underline-offset-4">3D, 2D and AI music videos</Link>,{" "}
          <Link to="/video-editing" className="text-foreground underline underline-offset-4">short-form video edits</Link> and{" "}
          <Link to="/ugc-ads" className="text-foreground underline underline-offset-4">UGC and product ads</Link>. More videos live on our{" "}
          <a href="https://youtube.com/@prodby74" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">YouTube channel</a>.
        </p>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <div className="mb-12 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {FILTERS.map((c) => (
            <button key={c} role="tab" aria-selected={f === c} onClick={() => setF(c)}
              className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${f === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
              {c === "All" ? "All" : CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>
        {list.length ? <ProjectGrid projects={list} /> : <p className="text-muted-foreground">New work in this category is on the way.</p>}
      </section>
      <ClosingCta title="Want your track here next?" cta="Start a project" />
    </>
  );
}
