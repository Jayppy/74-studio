import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageHero } from "@/components/SiteChrome";
import { listPublishedPosts } from "@/lib/blog.functions";
import { pageHead } from "@/lib/site";

const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: () => listPublishedPosts() });

export const Route = createFileRoute("/blog/")({
  staticData: { sitemap: true },
  head: () => pageHead("Blog: Music Video & Editing Insights | 74 Studio", "Articles on music videos, animation, video editing and visual storytelling from 74 Studio.", "/blog"),
  loader: ({ context }) => context.queryClient.ensureQueryData(postsQuery),
  component: Blog,
});

function Blog() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  return (
    <>
      <PageHero eyebrow="Journal" title="The blog">Process, ideas, and behind-the-scenes from the studio.</PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-28">
        {posts.length === 0 ? (
          <p className="border-t border-border pt-10 text-muted-foreground">No articles published yet. Check back soon.</p>
        ) : (
          <div className="divide-y divide-border border-y border-border">
            {posts.map((p) => (
              <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group grid gap-6 py-10 md:grid-cols-[320px_1fr]">
                {p.cover_url ? <img src={p.cover_url} alt={`Cover image for ${p.title}`} loading="lazy" decoding="async" className="aspect-video w-full rounded-sm object-cover" /> : <div className="aspect-video w-full rounded-sm bg-muted" />}
                <div>
                  <p className="eyebrow">{p.published_at ? new Date(p.published_at).toLocaleDateString(undefined, { dateStyle: "long" }) : ""}</p>
                  <h2 className="mt-3 text-3xl font-bold uppercase transition group-hover:text-chrome">{p.title}</h2>
                  <p className="mt-3 text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
