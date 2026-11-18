import { Link } from 'react-router-dom'
import { logoDirections } from '../lib/logoChoice'
import { useLogoChoice } from '../hooks/useLogoChoice'
import { Wordmark } from '../components/common/wordmarks'

function DirectionCard({ direction, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(direction.id)}
      aria-pressed={active}
      className={[
        'text-left px-6 py-6 border transition-colors duration-300',
        active
          ? 'border-deep-brown bg-cream shadow-[0_2px_0_rgba(70,58,48,0.08)]'
          : 'border-parchment bg-warm-cream/60 hover:border-eucalyptus-deep hover:bg-cream',
      ].join(' ')}
    >
      <span className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={[
            'inline-flex h-8 w-8 items-center justify-center rounded-full border font-heading text-lg',
            active ? 'border-deep-brown bg-deep-brown text-ivory' : 'border-parchment text-deep-brown-soft',
          ].join(' ')}
        >
          {direction.letter}
        </span>
        <span className="font-body text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-deep-brown">
          {direction.label}
        </span>
      </span>
      <span className="block font-body text-[0.82rem] text-deep-brown-soft mt-2.5 leading-relaxed">
        {direction.hint}
      </span>
    </button>
  )
}

export default function LogoComparison() {
  const [choice, setChoice] = useLogoChoice()

  return (
    <div className="bg-warm-cream min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 pb-24">
        <p className="eyebrow">Brand identity · review</p>
        <h1 className="font-heading text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.05] text-deep-brown mt-4 max-w-2xl text-balance">
          Two directions for the Zulfe Khaas wordmark
        </h1>
        <p className="font-body text-deep-brown-soft leading-relaxed mt-4 max-w-xl">
          The live navigation bar and footer already use whichever direction is selected here.
          Pick one to see it applied across the site.
        </p>

        <p className="mt-5 font-body text-sm">
          <Link to="/constellation-comparison" className="text-rosewood-ink border-b border-rosewood-ink/40 hover:border-rosewood-ink pb-0.5">
            Also reviewing: the herb constellation →
          </Link>
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          {logoDirections.map((d) => (
            <DirectionCard
              key={d.id}
              direction={d}
              active={choice === d.id}
              onSelect={setChoice}
            />
          ))}
        </div>

        <section aria-labelledby="nav-size" className="mt-16">
          <p className="eyebrow">At navigation size</p>
          <h2 id="nav-size" className="font-heading text-2xl md:text-3xl text-deep-brown mt-2">
            In context
          </h2>

          <div className="mt-6 border border-parchment bg-ivory px-5 sm:px-8">
            <div className="h-[var(--nav-height)] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 font-body text-[0.7rem] uppercase tracking-[0.18em] text-deep-brown/70">
                <span>Shop</span>
                <span>Botanical Book</span>
              </div>
              <Wordmark className="text-deep-brown justify-self-center" />
              <div className="hidden sm:flex items-center gap-6 justify-end font-body text-[0.7rem] uppercase tracking-[0.18em] text-deep-brown/70">
                <span>Reviews</span>
                <span>Our Story</span>
                <span>Contact</span>
              </div>
            </div>
          </div>

          <div className="mt-4 border border-ink/40 bg-ink px-5 sm:px-8">
            <div className="h-[var(--nav-height)] grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div className="hidden sm:flex items-center gap-6 font-body text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">
                <span>Shop</span>
                <span>Botanical Book</span>
              </div>
              <Wordmark className="text-ivory justify-self-center" />
              <div className="hidden sm:flex items-center gap-6 justify-end font-body text-[0.7rem] uppercase tracking-[0.18em] text-ivory/70">
                <span>Reviews</span>
                <span>Our Story</span>
                <span>Contact</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="side-by-side" className="mt-16">
          <p className="eyebrow">Side by side</p>
          <h2 id="side-by-side" className="font-heading text-2xl md:text-3xl text-deep-brown mt-2">
            Both directions, same size
          </h2>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-parchment bg-ivory px-6 py-10 flex flex-col items-center justify-center gap-6 min-h-[180px]">
              <Wordmark force="bodoni" size="display" className="text-deep-brown" />
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-deep-brown-soft">
                A · Bodoni-inspired
              </p>
            </div>
            <div className="border border-parchment bg-ivory px-6 py-10 flex flex-col items-center justify-center gap-6 min-h-[180px]">
              <Wordmark force="editorial" size="display" className="text-deep-brown" />
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-deep-brown-soft">
                B · Custom editorial
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-ink/30 bg-deep-brown px-6 py-10 flex flex-col items-center justify-center gap-6 min-h-[180px]">
              <Wordmark force="bodoni" size="display" className="text-warm-cream" />
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-eucalyptus">
                A · on deep cocoa
              </p>
            </div>
            <div className="border border-ink/30 bg-deep-brown px-6 py-10 flex flex-col items-center justify-center gap-6 min-h-[180px]">
              <Wordmark force="editorial" size="display" className="text-dusty-pink" />
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-eucalyptus">
                B · on deep cocoa
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="detail" className="mt-16">
          <p className="eyebrow">Detail</p>
          <h2 id="detail" className="font-heading text-2xl md:text-3xl text-deep-brown mt-2">
            Letterform and spacing
          </h2>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-parchment bg-sage/70 px-6 py-9">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-deep-brown">
                A · Bodoni-inspired
              </p>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-4">
                <Wordmark force="bodoni" className="text-deep-brown" />
                <Wordmark force="bodoni" size="lg" className="text-deep-brown" />
                <Wordmark force="bodoni" size="display" className="text-deep-brown" />
              </div>
              <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-6 max-w-md">
                Uppercase didone capitals with strong thick–thin contrast and even letterspacing.
                Restrained, formal and highly legible at small sizes.
              </p>
            </div>

            <div className="border border-parchment bg-dusty-pink/70 px-6 py-9">
              <p className="font-body text-[0.65rem] uppercase tracking-[0.2em] text-deep-brown">
                B · Custom editorial
              </p>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-4">
                <Wordmark force="editorial" className="text-deep-brown" />
                <Wordmark force="editorial" size="lg" className="text-deep-brown" />
                <Wordmark force="editorial" size="display" className="text-deep-brown" />
              </div>
              <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-6 max-w-md">
                Title-case lettering with tighter, optical spacing and a drawn swash that resolves
                into a diamond terminal — a signature detail with more warmth and individuality.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
