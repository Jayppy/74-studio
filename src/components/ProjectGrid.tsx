import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORY_LABELS, SERVICE_ROUTE, embedUrl, thumbUrl, type Project } from "@/lib/portfolio";

export function ProjectGrid({ projects, columns = 3 }: { projects: Project[]; columns?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<Project | null>(null);
  const cols = columns === 4 ? "lg:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <>
      <ul className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${cols}`}>
        {projects.map((p) => (
          <li key={p.id}>
            <article className="group">
              <button type="button" onClick={() => setOpen(p)} aria-label={`Play ${p.title}`} className="block w-full text-left">
                <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
                  <img
                    src={thumbUrl(p)}
                    alt={`${p.title}, ${CATEGORY_LABELS[p.category]} video by 74 STUDIO`}
                    width={480}
                    height={270}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                    className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-chrome/50 bg-background/60 backdrop-blur transition group-hover:scale-110">
                      <Play className="h-5 w-5 fill-current text-chrome" />
                    </span>
                  </span>
                  {p.concept && (
                    <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 eyebrow">Concept</span>
                  )}
                </div>
              </button>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  <button type="button" onClick={() => setOpen(p)} className="text-left hover:text-chrome">{p.title}</button>
                </h3>
                <Link to={SERVICE_ROUTE[p.category]} className="eyebrow shrink-0 hover:text-foreground">
                  {CATEGORY_LABELS[p.category]}
                </Link>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
            </article>
          </li>
        ))}
      </ul>
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-border bg-background p-0">
          {open && (
            <>
              <div className="aspect-video w-full bg-muted">
                <iframe
                  src={embedUrl(open)}
                  title={open.title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <p className="eyebrow">{CATEGORY_LABELS[open.category]}{open.concept ? " · Concept project" : ""}</p>
                <DialogTitle className="mt-2 font-display text-2xl">{open.title}</DialogTitle>
                <DialogDescription className="mt-1">{open.client}</DialogDescription>
                {open.source === "youtube" && (
                  <a href={`https://www.youtube.com/watch?v=${open.videoId}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                    Watch on YouTube
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

/** Thumbnail that only loads the video player after a click, so pages stay fast. */
export function VideoFacade({ project, label }: { project: Project; label: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={embedUrl(project)}
        title={label}
        className="h-full w-full"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
      />
    );
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${label}`} className="group relative block h-full w-full">
      <img
        src={thumbUrl(project)}
        alt={label}
        width={480}
        height={270}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-chrome/50 bg-background/60 backdrop-blur transition group-hover:scale-110">
          <Play className="h-6 w-6 fill-current text-chrome" />
        </span>
      </span>
    </button>
  );
}
