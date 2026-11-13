import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { canonicalUrl, pageHead } from "@/lib/site";
import { sitemapStaticPaths, sitemapXML } from "@/lib/sitemap";

const router = () => createRouter({ routeTree, context: { queryClient: new QueryClient() } });

describe("SEO rules", () => {
  it("canonical URLs use the preferred www.74-studio.com domain", () => {
    expect(canonicalUrl("/")).toBe("https://www.74-studio.com/");
    expect(canonicalUrl("/music-videos")).toBe("https://www.74-studio.com/music-videos");
    const head = pageHead("T", "D", "/about");
    expect(head.links).toEqual([{ rel: "canonical", href: "https://www.74-studio.com/about" }]);
    expect(head.meta).toContainEqual({ property: "og:url", content: "https://www.74-studio.com/about" });
  });

  it("sitemap lists every public page and no private ones", () => {
    const paths = sitemapStaticPaths(router());
    expect(paths).toEqual(
      ["/", "/about", "/blog", "/contact", "/music-videos", "/portfolio", "/ugc-ads", "/video-editing"].sort(),
    );
    expect(paths).not.toContain("/admin");
    expect(paths).not.toContain("/auth");
  });

  it("sitemap URLs are absolute https www URLs", () => {
    const xml = sitemapXML("https://www.74-studio.com/", [{ path: "/" }, { path: "/portfolio" }]);
    expect(xml).toContain("<loc>https://www.74-studio.com/</loc>");
    expect(xml).toContain("<loc>https://www.74-studio.com/portfolio</loc>");
  });
});
