import { useState } from "react";
import { Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORY_LABELS, embedUrl, thumbUrl, type Project } from "@/lib/portfolio";

export function ProjectGrid({ projects, columns = 3 }: { projects: Project[]; columns?: 2 | 3 | 4 }) {
  const [open, setOpen] = useState<Project | null>(null);
  const cols = columns === 4 ? "lg:grid-cols-4" : columns === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3";
  return (
    <>
      <div className={`grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${cols}`}>
        {projects.map((p) => (
          <button key={p.id} type="button" onClick={() => setOpen(p)} className="group text-left">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
              <img
                src={thumbUrl(p)}
                alt={`${p.title} — ${CATEGORY_LABELS[p.category]} by 74 STUDIO`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-chrome/50 bg-background/60 backdrop-blur transition group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current text-chrome" />
                </span>
              </span>
              {p.concept && (
                <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 eyebrow">Concept</span>
              )}
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <span className="eyebrow shrink-0">{CATEGORY_LABELS[p.category]}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
          </button>
        ))}
      </div>
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
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
