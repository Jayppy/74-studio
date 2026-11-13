import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/74-studio-logo.png.asset.json";
import { NAV, SOCIALS, STUDIO_EMAIL } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" aria-label="74 STUDIO home" className="shrink-0">
          <img src={logo.url} alt="74 STUDIO logo" width={1920} height={640} decoding="async" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-chrome hidden sm:inline-flex">Start a project</Link>
          <button type="button" className="xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-display text-lg uppercase tracking-wider">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-chrome mt-4 w-full">Start a project</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo.url} alt="74 STUDIO logo" width={1920} height={640} className="h-10 w-auto" loading="lazy" decoding="async" />
          <p className="mt-5 text-sm text-muted-foreground">
            An independent creative studio producing music videos, animation, and edited content for artists and brands worldwide.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-foreground">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/music-videos" className="text-muted-foreground hover:text-foreground">AI Music Videos</Link></li>
            <li><Link to="/music-videos" className="text-muted-foreground hover:text-foreground">2D Animation</Link></li>
            <li><Link to="/music-videos" className="text-muted-foreground hover:text-foreground">3D Music Videos</Link></li>
            <li><Link to="/music-videos" className="text-muted-foreground hover:text-foreground">Lyric Videos</Link></li>
            <li><Link to="/video-editing" className="text-muted-foreground hover:text-foreground">Video Editing</Link></li>
            <li><Link to="/ugc-ads" className="text-muted-foreground hover:text-foreground">UGC & Product Ads</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href={`mailto:${STUDIO_EMAIL}`} className="text-foreground hover:text-chrome">{STUDIO_EMAIL}</a></li>
            {SOCIALS.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-muted-foreground hover:text-foreground">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} 74 STUDIO. All rights reserved.</span>
          <span className="eyebrow">Creating visuals that move with the music.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 pt-20 md:pt-28">
      {/* The eyebrow is part of the H1 so the page's main heading names the service in plain words. */}
      <h1>
        <span className="eyebrow block">{eyebrow}</span>
        <span className="mt-5 block text-5xl font-bold uppercase leading-[0.92] md:text-8xl"><span className="text-chrome">{title}</span></span>
      </h1>
      {children && <div className="mt-8 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}

export function ClosingCta({ title, cta }: { title: string; cta: string }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-4xl text-4xl font-bold uppercase leading-tight md:text-6xl"><span className="text-chrome">{title}</span></h2>
        <Link to="/contact" className="btn-chrome mt-10">{cta}</Link>
      </div>
    </section>
  );
}
