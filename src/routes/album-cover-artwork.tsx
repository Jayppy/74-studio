import { createFileRoute, Link } from "@tanstack/react-router";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/album-cover-artwork")({
  staticData: { sitemap: true },
  head: () => pageHead("Non-AI Album Cover Design & Single Artwork | 74 Studio", "Human-designed album artwork and custom single cover art for independent artists. Original creative direction and professional artwork, without AI-generated imagery.", "/album-cover-artwork"),
  component: AlbumCoverArtwork,
});

const points = [
  "100% human-designed artwork",
  "No AI-generated cover art",
  "Custom creative direction tailored to each artist and release",
  "Professional artwork suitable for music streaming platforms",
  "Original visual concepts that establish a distinctive artist identity",
];

function AlbumCoverArtwork() {
  return (
    <>
      <PageHero eyebrow="Album Cover Artwork" title={<>Your sound.<br />An original identity.</>}>
        We create original, professionally designed album and single cover artwork that captures the identity, sound, and creative direction of an artist's music. Every cover is crafted through human creativity and professional design, not AI-generated imagery.
      </PageHero>
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow">Human-designed · Non-AI</p>
            <h2 className="mt-3 text-4xl font-bold uppercase md:text-5xl">Artwork that belongs to your music.</h2>
            <p className="mt-5 text-lg text-muted-foreground">For independent artists looking for an album cover designer who starts with their sound, their story, and their creative direction. From an album to a single, we shape a visual concept that feels like you.</p>
            <Link to="/contact" className="btn-chrome mt-8">Request cover artwork</Link>
          </div>
          <ul className="space-y-4 text-lg">
            {points.map((point) => <li key={point} className="border-b border-border pb-4">— {point}</li>)}
          </ul>
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="eyebrow">Beyond the cover</p>
          <h2 className="mt-3 text-3xl font-bold uppercase md:text-4xl">A cohesive single release.</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Bring your custom single cover art, music video, and short promo visualizer together with Complete Single Release Promo Content.</p>
          <Link to="/single-release-promo" className="btn-line mt-8">Explore the release package</Link>
        </div>
      </section>
      <ClosingCta title="Give your next release its own identity." cta="Request an artwork quote" />
    </>
  );
}