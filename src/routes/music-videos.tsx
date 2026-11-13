import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { PROJECTS, embedUrl, type Category } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/music-videos")({
  head: () => pageHead("Music Video Production | 74 Studio", "AI music videos, 2D animation, cinematic 3D music videos and lyric videos made for independent artists."),
  component: MusicVideos,
});

const sections: { t: string; d: string; del: string[]; cat: Category }[] = [
  { t: "AI Music Videos", d: "AI-assisted cinematic music videos, conceptual storytelling, and promotional visuals.", del: ["Full-length music video", "Teaser cut-downs", "Vertical social versions", "Cover art motion loop"], cat: "AI" },
  { t: "2D Animation", d: "Custom illustrated animation, animated artwork, and music-synchronized visuals.", del: ["Character & world design", "Frame-by-frame or motion animation", "Animated loops", "Social cut-downs"], cat: "2D" },
  { t: "3D Music Videos", d: "Cinematic 3D environments, character-driven storytelling, and immersive animation.", del: ["3D environments", "Camera choreography", "Character animation", "4K master delivery"], cat: "3D" },
  { t: "Lyric Videos", d: "Typography-driven lyric videos and animated lyrics.", del: ["Kinetic typography", "Synced lyric timing", "Branded styling", "Horizontal & vertical formats"], cat: "Lyric" },
];

function MusicVideos() {
  return (
    <>
      <PageHero eyebrow="Music video production" title={<>Your sound.<br />Your world.</>}>
        From AI-powered visuals to custom 2D animation and cinematic 3D environments, we create music videos that bring your artistic vision to life.
      </PageHero>
      {sections.map((s, i) => {
        const sample = PROJECTS.find((p) => p.category === s.cat);
        return (
          <section key={s.t} className="border-t border-border">
            <div className={`mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-video overflow-hidden rounded-sm bg-muted">
                {sample ? (
                  <iframe src={embedUrl(sample).replace("autoplay=1", "autoplay=0")} title={`${s.t} sample: ${sample.title}`} className="h-full w-full" loading="lazy" allowFullScreen />
                ) : (
                  <div className="flex h-full items-center justify-center eyebrow">Samples coming soon</div>
                )}
              </div>
              <div>
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-3 text-4xl font-bold uppercase md:text-5xl">{s.t}</h2>
                <p className="mt-5 text-lg text-muted-foreground">{s.d}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.del.map((d) => <li key={d} className="border-b border-border pb-2">— {d}</li>)}
                </ul>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/portfolio" className="btn-line">Explore portfolio</Link>
                  <Link to="/contact" className="btn-chrome">Start a project</Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <section className="mx-auto max-w-7xl border-t border-border px-5 py-24">
        <h2 className="mb-12 text-4xl font-bold uppercase md:text-5xl">Selected music videos</h2>
        <ProjectGrid projects={PROJECTS.filter((p) => ["3D", "2D", "AI", "Lyric"].includes(p.category)).slice(0, 6)} />
      </section>
      <ClosingCta title="Have a concept in mind?" cta="Request a music video" />
    </>
  );
}
