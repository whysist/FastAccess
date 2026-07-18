import { FastAccessApp } from '@/components/FastAccessApp';

// Server Component shell — interactive content lives in FastAccessApp (Client)
export default function Home() {
  return (
    <main className="min-h-screen bg-fa-bg">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Masthead — wayfinding signage aesthetic */}
        <header className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight uppercase text-fa-ink leading-none">
            FastAccess
          </h1>
          <p className="mt-1 text-xs font-bold tracking-[0.25em] uppercase text-fa-ink-muted">
            Stadium Navigation Companion
          </p>
          <div className="mt-5 h-[2px] bg-fa-ink" aria-hidden="true" />
        </header>

        <FastAccessApp />
      </div>
    </main>
  );
}