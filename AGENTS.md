<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Portfolio items are static data in src/lib/portfolio.ts (YouTube + Drive embeds), not DB rows — content changes rarely and needs no admin.
- Blog posts live in the posts table; public reads go through server fns with the publishable client, writes are admin-only via RLS + has_role.
- First account to sign up becomes admin (DB trigger); later sign-ups get no role.
- Every public route sets head via pageHead(title, description, path) from src/lib/site.ts, which emits an absolute canonical + og:url on SITE_URL — one place controls the preferred domain.
- Every route declares staticData.sitemap; /sitemap.xml is derived from the router (src/lib/sitemap.ts) plus published blog posts, so new pages need only that flag.
- Brand images (logo, covers) are bundled imports from src/assets, not lovable-assets CDN pointers — the site is also served from hosting outside Lovable, where /__l5e/ asset URLs 404.
