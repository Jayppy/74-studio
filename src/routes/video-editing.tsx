import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { byCategory } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/video-editing")({
  staticData: { sitemap: true },
  head: () => pageHead("Short-Form Video Editing for Reels, TikTok & Shorts | 74 Studio", "Short-form and long-form video editing for artists, creators and brands: Instagram Reels, TikTok, YouTube Shorts, release teasers and promo edits.", "/video-editing"),
  component: Editing,
});

const edits = [
  { t: "Artist Content", d: "Performance clips, studio sessions, music promos, and artist branding content." },
  { t: "Social Media Reels", d: "Instagram Reels, TikTok videos, and YouTube Shorts." },
  { t: "Behind the Scenes", d: "Studio footage, interviews, documentary clips, and creative process videos." },
  { t: "Promotional Content", d: "Release teasers, announcements, music campaigns, and promotional edits." },
];
const caps = ["Cinematic pacing", "Dynamic cuts", "Captions and subtitles", "Motion graphics", "Music synchronization", "Sound design", "Color correction", "Platform-ready exports"];
const steps = [
  { n: "01", t: "Share your footage", d: "Send your footage, music, and creative references." },
  { n: "02", t: "Creative editing", d: "We edit your content according to your direction and the intended platform." },
  { n: "03", t: "Final delivery", d: "Receive polished, platform-ready videos." },
];

function Editing() {
  return (
    <>
      <PageHero eyebrow="Short-form video editing · Social content production" title={<>Create.<br />Cut.<br />Captivate.</>}>
        <p>Professional short-form video editing for artists, creators, and brands that want their content to stand out on Instagram Reels, TikTok and YouTube Shorts.</p>
        <p className="mt-4">From music release teasers to engaging Reels and Shorts, we transform raw footage into polished, compelling content.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#editing-work" className="btn-chrome">Explore editing work</a>
          <Link to="/contact" className="btn-line">Start an editing project</Link>
        </div>
      </PageHero>
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:grid-cols-4">
          {edits.map((e) => (
            <div key={e.t} className="bg-background p-8">
              <h2 className="text-xl font-semibold uppercase">{e.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <p className="eyebrow">Editing capabilities</p>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 font-display text-2xl uppercase md:text-3xl">
          {caps.map((c) => <li key={c} className="text-chrome">{c}</li>)}
        </ul>
      </section>
      <section id="editing-work" className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <h2 className="mb-12 text-4xl font-bold uppercase md:text-5xl">Edited to make every frame count.</h2>
          <ProjectGrid projects={[...byCategory("Editing"), ...byCategory("UGC").slice(0, 5)]} />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-4xl font-bold uppercase md:text-5xl">How it works</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-chrome/40 pt-6">
              <p className="font-display text-5xl text-chrome">{s.n}</p>
              <h3 className="mt-4 text-xl font-semibold uppercase">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
      <ClosingCta title="Have content that needs a creative touch?" cta="Request an editing quote" />
    </>
  );
}
