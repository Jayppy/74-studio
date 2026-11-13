# 74 STUDIO website

Build the full multi-page site from the brief, plus a blog you publish from an admin login, your real social links, and portfolio videos from YouTube and Google Drive.

## Pages
- Home, Music Videos, Video Editing, UGC & Product Ads, Portfolio, About, Contact, Blog (list + article page)
- Shared header (logo, all nav links, START A PROJECT) and footer (tagline, services, socials, email)
- No pricing anywhere; every CTA leads to Contact

## Look
- Dark chrome palette from the brief (#101114 background, silver/chrome accents), Space Grotesk headlines, Manrope body
- Uploaded 74 STUDIO logo in header/footer, square favicon made from it
- Editorial, cinematic layouts, minimal cards and animation

## Contact and socials
- Email: inquire@74-studio.com
- Discord, LinkedIn, YouTube (@prodby74), Instagram (prod.by.74), X (prodby74) in footer and Contact page
- Inquiry form with all brief fields and validation; each submission is saved so you can read it (email alerts need a verified domain, offered later)

## Portfolio
- YouTube: pull every video from @prodby74 and keep only 3D work, leaving out any video YouTube labels as AI-generated (altered/synthetic content). Shown as embedded players.
- Google Drive folder: the videos in your shared folder are copied into the site and play directly. The folder must be shared "Anyone with the link"; if it is private, I'll ask you to connect Google Drive.
- Filters: All, AI, 2D, 3D, Lyric, Video Editing, UGC/Product Ads; each project opens a detail view. Concept projects labeled; no invented clients.

## Blog
- Public blog list and article pages with their own titles/descriptions for search
- Admin sign-in (email + password) for you only; admin area to write, edit, save as draft, publish, and delete articles with a cover image
- Only the admin account can publish; visitors only read published posts

## Technical details
- Lovable Cloud: posts table, inquiries table, user_roles + has_role for admin, storage bucket for cover images, RLS on all tables
- YouTube list fetched once via website fetch; AI label checked per video page ("Altered or synthetic content"); stored as static data
- Drive files downloaded, uploaded as CDN assets
- Per-route head() metadata on every page
