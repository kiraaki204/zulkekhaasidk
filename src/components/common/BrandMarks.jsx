/** Shared brand marks — lightweight SVG so we don't depend on external assets. */

export function BotanicalSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 64"
      className={className}
      aria-hidden="true"
      fill="none"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path
        d="M8 52C28 48 48 40 64 24"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M28 46c-2-6 1-11 6-13 2 5 0 11-6 13Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M40 38c-1-6 3-11 8-12 1 5-2 11-8 12Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M52 28c0-6 4-10 9-11 0 5-3 10-9 11Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M34 42c4-4 9-4 13-1-4 3-9 4-13 1Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M48 33c4-4 9-4 13-1-4 3-9 4-13 1Z" stroke="currentColor" strokeWidth="0.9" />
      <path d="M64 24c4-5 10-6 14-3-4 4-9 6-14 3Z" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="64" cy="24" r="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

export function CornerLeaf({ className = '' }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 72C8 40 28 16 64 8 56 44 36 66 8 72Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M12 68C28 48 44 32 60 16" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
      <path d="M24 56c4-2 8-2 12 0M32 44c4-2 8-2 12 0M40 32c4-2 8-2 12 0" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />
    </svg>
  )
}
