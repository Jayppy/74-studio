import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-chrome.jpg";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ClosingCta } from "@/components/SiteChrome";
import { PROJECTS } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => pageHead("74 Studio | Music Videos & Creative Production", "74 STUDIO is an independent creative studio producing cinematic music videos, animated visuals, and digital content for artists."),
  component: Home,
});

const services = [
  { n: "01", t: "AI Music Videos", d: "AI-assisted cinematic visuals and conceptual storytelling.", to: "/music-videos" },
  { n: "02", t: "2D Animation", d: "Custom illustrated animation synced to your music.", to: "/music-videos" },
  { n: "03", t: "3D Music Videos", d: "Cinematic 3D worlds and character-driven stories.", to: "/music-videos" },
  { n: "04", t: "Short-Form Video Editing", d: "Reels, Shorts and teasers cut to captivate.", to: "/video-editing" },
] as const;

function Home() {
  const featured = PROJECTS.filter((p) => p.source === "youtube").slice(0, 6);
  return (
    <>
      <section className="relative isolate flex min-h-[88vh] items-end overflow-hidden">
        <img src={hero} alt="Sculptural chrome forms in a dark, misty studio" width={1920} height={1088} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="bg-fade absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20">
          <p className="eyebrow">We turn sound into something you can see.</p>
          <h1 className="mt-6 text-6xl font-bold uppercase leading-[0.88] md:text-[9rem]">
            <span className="text-chrome">Your music.<br />Our visuals.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            74 STUDIO is an independent creative studio producing cinematic music videos, animated visuals, and digital content for artists who want their music to stand out.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/portfolio" className="btn-chrome">Explore our work</Link>
            <Link to="/contact" className="btn-line">Start a project</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-4xl font-bold uppercase md:text-6xl">Selected works</h2>
          <Link to="/portfolio" className="btn-line">View all projects</Link>
        </div>
        <ProjectGrid projects={featured} />
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <h2 className="text-4xl font-bold uppercase md:text-6xl">What we create</h2>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {services.map((s) => (
              <Link key={s.n} to={s.to} className="group grid items-baseline gap-4 py-8 md:grid-cols-[80px_1fr_1fr]">
                <span className="eyebrow">{s.n}</span>
                <span className="font-display text-3xl font-semibold uppercase transition group-hover:text-chrome md:text-4xl">{s.t}</span>
                <span className="text-muted-foreground">{s.d}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-2">
        <h2 className="text-4xl font-bold uppercase leading-tight md:text-6xl"><span className="text-chrome">Every track has a visual story.</span></h2>
        <div className="space-y-6 text-lg text-muted-foreground">
          <p>We transform music into visual experiences through animation, cinematic storytelling, and creative editing.</p>
          <p>Every project begins with the sound, the artist, and the story they want to tell.</p>
        </div>
      </section>

      <ClosingCta title="Let's create something that moves people." cta="Start your project" />
    </>
  );
}
