import { createFileRoute, Link } from "@tanstack/react-router";
import { ProjectGrid, VideoFacade } from "@/components/ProjectGrid";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { PROJECTS, type Category } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/music-videos")({
  staticData: { sitemap: true },
  head: () => pageHead("3D, 2D & AI Music Video Production | 74 Studio", "Music video production for independent artists: cinematic 3D music videos, 2D animated music videos, AI music videos, visualizers and lyric videos.", "/music-videos"),
  component: MusicVideos,
});

const sections: { t: string; d: string; who: string; del: string[]; cat: Category }[] = [
  {
    t: "3D Music Videos",
    d: "Cinematic 3D music video production: built environments, character-driven storytelling, and immersive animation timed to your track.",
    who: "For artists who want a full visual world around a single, an album rollout, or an official visualizer.",
    del: ["3D environments", "Camera choreography", "Character animation", "Music visualizers & loops", "4K master delivery"],
    cat: "3D",
  },
  {
    t: "2D Animation",
    d: "2D animated music videos made from custom illustration: animated artwork, characters, and visuals synchronized to the music.",
    who: "For musicians and producers who want a hand-crafted, illustrated look that is unmistakably theirs.",
    del: ["Character & world design", "Frame-by-frame or motion animation", "Animated cover art & loops", "Social cut-downs"],
    cat: "2D",
  },
  {
    t: "AI Music Videos",
    d: "AI music video production that combines AI-assisted imagery with editing and direction, for conceptual storytelling and promotional visuals.",
    who: "For independent artists who want bold, experimental visuals for a release or campaign.",
    del: ["Full-length music video", "Teaser cut-downs", "Vertical social versions", "Cover art motion loop"],
    cat: "AI",
  },
  {
    t: "Lyric Videos",
    d: "Typography-driven lyric videos and animated lyrics, styled to match your artwork and release.",
    who: "For releases that need a YouTube-ready video fast, or a companion piece alongside an official video.",
    del: ["Kinetic typography", "Synced lyric timing", "Branded styling", "Horizontal & vertical formats"],
    cat: "Lyric",
  },
];

function MusicVideos() {
  return (
    <>
      <PageHero eyebrow="Music video production" title={<>Your sound.<br />Your world.</>}>
        From cinematic 3D environments and custom 2D animation to AI-powered visuals and lyric videos, we create music videos and visualizers that bring an independent artist's vision to life. You get a finished video ready for YouTube, plus versions cut for Reels, TikTok and Shorts.
      </PageHero>
      {sections.map((s, i) => {
        const sample = PROJECTS.find((p) => p.category === s.cat);
        return (
          <section key={s.t} className="border-t border-border">
            <div className={`mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-video overflow-hidden rounded-sm bg-muted">
                {sample ? (
                  <VideoFacade project={sample} label={`${s.t} sample: ${sample.title}`} />
                ) : (
                  <div className="flex h-full items-center justify-center eyebrow">Samples coming soon</div>
                )}
              </div>
              <div>
                <p className="eyebrow">0{i + 1}</p>
                <h2 className="mt-3 text-4xl font-bold uppercase md:text-5xl">{s.t}</h2>
                <p className="mt-5 text-lg text-muted-foreground">{s.d}</p>
                <p className="mt-3 text-muted-foreground">{s.who}</p>
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
