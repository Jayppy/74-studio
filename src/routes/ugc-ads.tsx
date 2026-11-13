import { createFileRoute } from "@tanstack/react-router";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ClosingCta, PageHero } from "@/components/SiteChrome";
import { byCategory, DRIVE_FOLDERS } from "@/lib/portfolio";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/ugc-ads")({
  staticData: { sitemap: true },
  head: () => pageHead("UGC, Product & Real Estate Ad Videos | 74 Studio", "UGC ads, product demos, app and SaaS walkthroughs and real estate promo videos for brands, edited for Meta, TikTok and YouTube.", "/ugc-ads"),
  component: Ugc,
});

const kinds = [
  { t: "UGC Ads", d: "Creator-style ads that feel native to the feed and drive action." },
  { t: "Product Ads", d: "Product showcases, demos and launch spots for e-commerce and DTC brands." },
  { t: "Real Estate Ads", d: "Property walkthroughs and listing promos edited for social reach." },
];

function Ugc() {
  return (
    <>
      <PageHero eyebrow="UGC & product ads" title={<>Ads that<br />stop the scroll.</>}>
        Direct-response video for brands: UGC, product demos, app and SaaS walkthroughs, and real estate promos, shaped for each platform.
      </PageHero>
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-3">
          {kinds.map((k) => (
            <div key={k.t} className="bg-background p-8">
              <h2 className="text-2xl font-semibold uppercase">{k.t}</h2>
              <p className="mt-3 text-muted-foreground">{k.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="mb-12 text-4xl font-bold uppercase md:text-5xl">Ad work</h2>
        <ProjectGrid projects={byCategory("UGC")} />
      </section>
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="eyebrow">More collections</p>
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {DRIVE_FOLDERS.map((f) => (
              <li key={f.id}>
                <a href={`https://drive.google.com/drive/folders/${f.id}`} target="_blank" rel="noreferrer" className="flex justify-between border-b border-border py-4 font-display uppercase hover:text-chrome">
                  {f.title} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta title="Need ads that convert?" cta="Request an ad quote" />
    </>
  );
}
