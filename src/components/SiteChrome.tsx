import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/74-studio-logo.webp";
import { NAV, SOCIALS, STUDIO_EMAIL } from "@/lib/site";
import { DiscordLink } from "@/components/DiscordButton";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" aria-label="74 STUDIO home" className="shrink-0">
          <img src={logo} alt="74 STUDIO logo" width={1200} height={400} decoding="async" className="h-12 w-auto md:h-14" />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className="relative rounded-sm px-3 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-foreground/80 transition hover:bg-steel-soft hover:text-foreground after:absolute after:inset-x-3 after:-bottom-[15px] after:h-0.5 after:origin-left after:scale-x-0 after:bg-steel after:transition data-[status=active]:text-foreground data-[status=active]:after:scale-x-100">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-chrome hidden sm:inline-flex">Start a project</Link>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-border bg-background px-5 py-4 xl:hidden" aria-label="Mobile">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} onClick={() => setOpen(false)} className="block border-l-2 border-transparent py-3 pl-4 font-display text-lg font-semibold uppercase tracking-wider text-foreground/85 data-[status=active]:border-steel data-[status=active]:text-steel">
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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-steel/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo} alt="74 STUDIO logo" width={1200} height={400} className="h-12 w-auto" loading="lazy" decoding="async" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            An independent creative studio producing music videos, animation, and edited content for artists and brands worldwide.
          </p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="text-foreground/75 transition hover:text-steel">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><Link to="/music-videos" className="text-foreground/75 transition hover:text-steel">AI Music Videos</Link></li>
            <li><Link to="/music-videos" className="text-foreground/75 transition hover:text-steel">2D Animation</Link></li>
            <li><Link to="/music-videos" className="text-foreground/75 transition hover:text-steel">3D Music Videos</Link></li>
            <li><Link to="/music-videos" className="text-foreground/75 transition hover:text-steel">Lyric Videos</Link></li>
            <li><Link to="/video-editing" className="text-foreground/75 transition hover:text-steel">Video Editing</Link></li>
            <li><Link to="/ugc-ads" className="text-foreground/75 transition hover:text-steel">UGC & Product Ads</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <ul className="mt-4 space-y-2.5 text-[15px]">
            <li><a href={`mailto:${STUDIO_EMAIL}`} className="font-semibold text-steel hover:text-foreground">{STUDIO_EMAIL}</a></li>
            {SOCIALS.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-foreground/75 transition hover:text-steel">{s.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-5 py-6 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} 74 STUDIO. All rights reserved.</span>
          <span className="eyebrow">Creating visuals that move with the music.</span>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 md:pt-28">
      <div className="pointer-events-none absolute -top-10 left-0 -z-10 h-72 w-[36rem] max-w-full rounded-full bg-steel/10 blur-3xl" aria-hidden="true" />
      {/* The eyebrow is part of the H1 so the page's main heading names the service in plain words. */}
      <h1>
        <span className="eyebrow block">{eyebrow}</span>
        <span className="mt-5 block text-5xl font-bold uppercase leading-[0.92] md:text-8xl"><span className="text-chrome">{title}</span></span>
      </h1>
      {children && <div className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85">{children}</div>}
    </section>
  );
}

export function ClosingCta({ title, cta }: { title: string; cta: string }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 text-center md:py-32">
        <h2 className="mx-auto max-w-4xl text-4xl font-bold uppercase leading-tight md:text-6xl"><span className="text-chrome">{title}</span></h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn-chrome">{cta}</Link>
          <DiscordLink label="Chat with us on Discord" />
        </div>
      </div>
    </section>
  );
}
