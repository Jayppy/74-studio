import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/single-release-promo")({
  staticData: { sitemap: true },
  head: () => pageHead("Complete Single Release Promo Content | 74 Studio", "Single release promotional content for independent artists: human-designed cover artwork, music video production and a short promo visualizer with a cohesive visual identity.", "/single-release-promo"),
  component: SingleReleasePromo,
});

const deliverables = [
  { n: "01", title: "Single Cover Artwork", description: "Custom-designed, professionally crafted cover art for the music release. Human-designed artwork, not AI-generated imagery." },
  { n: "02", title: "Music Video", description: "A professionally produced music video that visually interprets the song and its creative direction." },
  { n: "03", title: "Short Promo Visualizer", description: "A short, engaging promotional visualizer designed for social media promotion, teasers, and release campaigns." },
];

function SingleReleasePromo() {
  return (
    <>
      <PageHero eyebrow="Complete Single Release Promo Content" title={<>One release.<br />A complete visual story.</>}>
        A complete visual package designed to help independent artists promote a new single with a cohesive and professional visual identity. Instead of sourcing different creatives for different promotional materials, artists can get their essential release visuals together through 74 Studio.
      </PageHero>
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="eyebrow">Three deliverables · One creative direction</p>
          <h2 className="mt-3 text-4xl font-bold uppercase md:text-5xl">Your release essentials.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {deliverables.map((item) => (
              <div key={item.n} className="border-t border-chrome/40 pt-6">
                <p className="font-display text-5xl text-chrome">{item.n}</p>
                <h3 className="mt-4 text-2xl font-semibold uppercase">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
          <h2 className="text-4xl font-bold uppercase md:text-5xl">Made to feel like one release.</h2>
          <div>
            <p className="text-lg text-muted-foreground">From the cover to the music video and social teasers, a shared creative direction keeps your music promotion visuals connected. Music video production and music visualizer production sit alongside your artwork, giving independent artists a complete visual presentation for their new single.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/album-cover-artwork" className="btn-line">Explore cover artwork</Link>
              <Link to="/music-videos" className="btn-line">Explore music videos</Link>
            </div>
          </div>
        </div>
      </section>
      <ClosingCta title="Bring your next single together." cta="Discuss your release" />
    </>
  );
}