import { DISCORD_URL } from "@/lib/site";

export function DiscordIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.37-.44.86-.6 1.25a18.27 18.27 0 0 0-5.49 0 12.64 12.64 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.07 0a.07.07 0 0 1 .08 0l.37.3a.08.08 0 0 1 0 .13c-.6.35-1.22.65-1.87.89a.08.08 0 0 0-.04.11c.36.7.78 1.36 1.23 1.99a.08.08 0 0 0 .08.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

/** Inline call to action: opens the studio's Discord server in a new tab. */
export function DiscordLink({ label = "Chat with our team on Discord", className = "" }: { label?: string; className?: string }) {
  return (
    <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className={`btn-discord ${className}`}>
      <DiscordIcon />
      {label}
    </a>
  );
}

/** Floating button shown on every page so visitors can reach the team quickly. */
export function FloatingDiscord() {
  return (
    <a
      href={DISCORD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our team on Discord about your project"
      className="btn-discord fixed bottom-5 right-5 z-40 !min-h-14 !rounded-full !px-4 shadow-card sm:!px-5"
    >
      <DiscordIcon className="h-6 w-6" />
      <span className="hidden flex-col items-start leading-tight sm:flex">
        <span className="text-[0.68rem] font-semibold tracking-[0.14em] opacity-85">Questions?</span>
        <span>Chat with our team</span>
      </span>
    </a>
  );
}
