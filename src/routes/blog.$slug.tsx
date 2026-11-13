import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPublishedPost } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const post = await getPublishedPost({ data: { slug: params.slug } });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Article | 74 Studio" }, { name: "robots", content: "noindex" }] };
    const meta = [
      { title: `${loaderData.title} | 74 Studio` },
      { name: "description", content: loaderData.excerpt },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.excerpt },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (loaderData.cover_url?.startsWith("https://")) {
      meta.push({ property: "og:image", content: loaderData.cover_url }, { name: "twitter:image", content: loaderData.cover_url });
    }
    return { meta };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="text-4xl font-bold uppercase">Article not found</h1>
      <Link to="/blog" className="btn-line mt-8">Back to blog</Link>
    </div>
  ),
  component: Post,
});

function Post() {
  const p = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-20">
      <Link to="/blog" className="eyebrow hover:text-foreground">← Blog</Link>
      <p className="mt-8 eyebrow">{p.published_at ? new Date(p.published_at).toLocaleDateString(undefined, { dateStyle: "long" }) : ""}</p>
      <h1 className="mt-4 text-4xl font-bold uppercase leading-tight md:text-6xl"><span className="text-chrome">{p.title}</span></h1>
      {p.excerpt && <p className="mt-6 text-xl text-muted-foreground">{p.excerpt}</p>}
      {p.cover_url && <img src={p.cover_url} alt={p.title} className="mt-10 w-full rounded-sm" />}
      <div className="mt-12 space-y-6 text-lg leading-relaxed">
        {p.content.split(/\n{2,}/).map((para, i) =>
          para.startsWith("## ") ? <h2 key={i} className="pt-6 text-2xl font-bold uppercase">{para.slice(3)}</h2> : <p key={i} className="whitespace-pre-line">{para}</p>,
        )}
      </div>
    </article>
  );
}
