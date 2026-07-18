'use client';

interface Profile {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const PROFILES: Profile[] = [
  {
    id: 'wheelchair',
    label: 'Wheelchair',
    description: 'Excludes stairs-only routes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="6" r="3" fill="white" />
        <path d="M10 10h6l2 8H9l1-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M9 15l-2 5h11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="18" cy="23" r="2.5" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="9" cy="23" r="2.5" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'low-vision',
    label: 'Low Vision',
    description: 'Avoids flashing lighting',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <ellipse cx="14" cy="14" rx="10" ry="7" stroke="white" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="3.5" fill="white" />
        <path d="M4 4l20 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'deaf',
    label: 'Deaf',
    description: 'No audio cue dependency',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M12 7C12 7 16 8 16 13C16 16 14 18 12 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M16 13C16 13 20 12 20 16C20 20 16 22 14 24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M8 8C8 8 10 10 10 13" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M4 4l20 20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'sensory-sensitive',
    label: 'Sensory Sensitive',
    description: 'Avoids high-noise and flashing routes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 14C4 14 7 8 14 8C21 8 24 14 24 14C24 14 21 20 14 20C7 20 4 14 4 14Z" stroke="white" strokeWidth="2" fill="none" />
        <path d="M7 20L5 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 20V24" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 20L23 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3.5 9L7.5 13L14.5 5" stroke="#1A4D8F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Props {
  selected: string[];
  onChange: (profiles: string[]) => void;
}

export function ProfileSelector({ selected, onChange }: Props) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id]);
  };

  return (
    <div role="group" aria-label="Select access profiles" className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {PROFILES.map((profile) => {
        const isSelected = selected.includes(profile.id);
        return (
          <button
            key={profile.id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => toggle(profile.id)}
            className={[
              'relative text-left p-4 bg-white transition-none',
              'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-fa-route focus-visible:ring-offset-[3px]',
              isSelected
                ? 'border-[3px] border-fa-route'
                : 'border border-fa-border hover:border-fa-ink/40',
            ].join(' ')}
          >
            {/* Pictogram badge */}
            <div
              className="w-12 h-12 bg-fa-route flex items-center justify-center mb-3 flex-shrink-0"
              aria-hidden="true"
            >
              {profile.icon}
            </div>

            {/* Selected checkmark */}
            {isSelected && (
              <span
                className="absolute top-2 right-2"
                aria-hidden="true"
              >
                <CheckIcon />
              </span>
            )}

            <div className="font-bold text-sm text-fa-ink leading-tight mb-1">{profile.label}</div>
            <div className="text-xs text-fa-ink-muted leading-snug">{profile.description}</div>
          </button>
        );
      })}
    </div>
  );
}