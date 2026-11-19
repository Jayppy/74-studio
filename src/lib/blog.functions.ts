import { createServerFn } from "@tanstack/react-start";
import { publicSupabase as publicClient } from "@/lib/public-supabase";

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("posts")
    .select("id, slug, title, excerpt, cover_url, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getPublishedPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => ({ slug: String(input.slug).slice(0, 200) }))
  .handler(async ({ data }) => {
    const { data: post, error } = await publicClient()
      .from("posts")
      .select("id, slug, title, excerpt, content, cover_url, published_at, updated_at")
      .eq("slug", data.slug)
      .eq("published", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return post;
  });
