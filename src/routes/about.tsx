import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/74-studio-logo.png.asset.json";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => pageHead("About 74 Studio | Independent Music Video Studio", "Meet 74 Studio, an independent creative studio led by John Peter, turning music and artistic identity into music videos and visual experiences.", "/about"),
  component: About,
});

const blocks = [
  { t: "Studio philosophy", d: "Music deserves visuals that feel as intentional as the song. We start with the sound and build outward, so every frame carries the mood of the track." },
  { t: "Creative direction", d: "Each project gets its own visual language: palette, pacing, camera and texture chosen to match the artist, not a template." },
  { t: "Production approach", d: "We blend 3D, 2D animation, AI-assisted tools and editorial editing, picking the right technique for the story and the release plan." },
  { t: "Commitment to artists", d: "We work with independent musicians directly, communicate clearly, and treat every release like it matters, because to the artist it does." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title={<>Independent in spirit.<br />Cinematic in execution.</>}>
        74 STUDIO is an independent creative studio focused on transforming music and artistic identity into compelling visual experiences.
      </PageHero>
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.t}>
              <h2 className="text-2xl font-semibold uppercase">{b.t}</h2>
              <p className="mt-4 text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <img src={logo.url} alt="74 STUDIO chrome emblem with metallic portrait" loading="lazy" className="w-full" />
          <div>
            <p className="eyebrow">Founder / Creative Director</p>
            <h2 className="mt-3 text-4xl font-bold uppercase">John Peter</h2>
            <p className="mt-5 text-muted-foreground">
              John founded 74 STUDIO to give independent artists access to visuals with real cinematic weight. He directs every project personally, from first listen to final export.
            </p>
            <p className="mt-6 eyebrow">Brand identity</p>
            <p className="mt-3 text-muted-foreground">
              The sculpted chrome 74 and metallic portrait reflect what we stand for: crafted, industrial, and personal at the same time.
            </p>
          </div>
        </div>
      </section>
      <ClosingCta title="Let's build your next visual." cta="Start a project" />
    </>
  );
}
