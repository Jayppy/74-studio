export const STUDIO_EMAIL = "inquire@74-studio.com";

export const SOCIALS = [
  { label: "YouTube", href: "https://youtube.com/@prodby74" },
  { label: "Instagram", href: "https://www.instagram.com/prod.by.74" },
  { label: "X (Twitter)", href: "https://x.com/prodby74" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/prodby74" },
  { label: "Discord", href: "https://discord.gg/EaAaSaGe" },
] as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/music-videos", label: "Music Videos" },
  { to: "/video-editing", label: "Video Editing" },
  { to: "/ugc-ads", label: "UGC & Product Ads" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  "AI Music Video",
  "2D Animation",
  "3D Music Video",
  "Lyric Video",
  "Short-Form/Long-Form Editing",
  "UGC/Product Ads",
  "Custom Project",
] as const;

export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
