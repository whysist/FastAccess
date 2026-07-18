'use client';

import { useState, useRef } from 'react';

interface QueryResponse {
  echo: string;
  stub: boolean;
  message: string;
}

export function QueryBox() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? 'Query failed.');
      } else {
        setResponse(await res.json());
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 max-w-2xl">
        <label htmlFor="query-input" className="text-sm text-fa-ink-muted">
          Ask about accessibility features, quiet zones, routes, or sensory events.
        </label>
        <div className="flex gap-3 items-start">
          <textarea
            ref={inputRef}
            id="query-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit(e);
              }
            }}
            rows={2}
            className="flex-1 border border-fa-border px-4 py-3 text-sm text-fa-ink bg-white resize-none
                       focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]
                       placeholder:text-fa-ink-muted"
            placeholder="e.g. Which gate has the shortest step-free route to Section 103?"
            disabled={loading}
            aria-label="Question input"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="h-11 px-6 bg-fa-route text-white font-bold text-sm uppercase tracking-wider flex-shrink-0
                       disabled:opacity-40 hover:bg-[#163f75] transition-colors
                       focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]"
            aria-busy={loading}
          >
            {loading ? 'Asking…' : 'Ask'}
          </button>
        </div>
      </form>

      {/* Response area */}
      {error && (
        <p role="alert" className="mt-4 text-fa-caution text-sm font-bold">
          {error}
        </p>
      )}

      {response && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 max-w-2xl border border-fa-border bg-white p-4"
        >
          {response.stub && (
            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-fa-border">
              <span className="text-[10px] font-bold uppercase tracking-widest text-fa-ink-muted bg-fa-ink/5 px-2 py-1">
                AI Preview
              </span>
              <span className="text-xs text-fa-ink-muted">Features coming soon</span>
            </div>
          )}
          <p className="text-sm text-fa-ink leading-relaxed">{response.message}</p>
        </div>
      )}
    </div>
  );
}