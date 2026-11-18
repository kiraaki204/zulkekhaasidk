import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BotanicalSprig } from '../common/BrandMarks'
import { useReveal } from '../../hooks/useUi'
import driedFlowers from '../../assets/images/Dried Flowers Still Life.jpg'
import { getCredit } from '../../data/imageCredits'

const atmosphereCredit = getCredit('Dried Flowers Still Life.jpg')

const contents = [
  {
    index: '01',
    title: 'The Oil',
    detail: 'Zulfe Khaas · 150 ml',
    to: '/product',
  },
  {
    index: '02',
    title: 'The Herbs',
    detail: 'Twenty-seven, hand-selected',
    to: '/botanical-book',
  },
  {
    index: '03',
    title: 'The Ritual',
    detail: 'The slow practice',
    to: '#ritual',
  },
]

/** Fine-line eucalyptus sprig — drawn, not clipped, so it can overlap the blob. */
function LineSprig({ className = '' }) {
  const leaves = [
    [58, 30, -30], [44, 62, -18], [32, 96, -6], [24, 130, 6],
    [70, 34, 28], [56, 66, 16], [44, 100, 4], [36, 134, -8],
  ]
  return (
    <svg viewBox="0 0 100 190" className={className} fill="none" aria-hidden="true">
      <path
        d="M62 186C58 130 52 66 44 12"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {leaves.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="7.4"
          ry="4.6"
          transform={`rotate(${r} ${x} ${y})`}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
      <circle cx="44" cy="10" r="2.2" fill="currentColor" opacity="0.65" />
    </svg>
  )
}

/** Large, faint branch emerging from behind the photography. */
function GhostBranch({ className = '' }) {
  return (
    <svg viewBox="0 0 220 260" className={className} fill="none" aria-hidden="true">
      <path
        d="M30 250C52 176 84 108 150 38"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M84 160c14-4 22-16 24-32" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M112 112c14-4 22-16 24-32" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M142 66c13-4 20-15 22-30" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M62 206c12-8 16-22 12-36" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M96 148c-16 2-28-6-36-20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M124 102c-16 2-28-6-36-20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="152" cy="35" r="2.4" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

export default function BrandIntro() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="meet"
      className="relative bg-warm-cream texture-parchment overflow-hidden"
    >
      {/* Atmospheric washes — eucalyptus top right, rose dust bottom left.
          Deliberately weak at the top edge so the hero seam stays seamless. */}
      <div
        aria-hidden="true"
        className="absolute top-10 -right-32 w-[30rem] md:w-[38rem] h-[30rem] md:h-[38rem] rounded-full bg-sage/35 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-36 w-[28rem] md:w-[34rem] h-[28rem] md:h-[34rem] rounded-full bg-dusty-pink/30 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-butter/15 blur-3xl pointer-events-none"
      />
      {/* Ghost monogram, bled off the corner */}
      <span
        aria-hidden="true"
        className="absolute -right-10 -bottom-10 font-heading text-[10rem] md:text-[14rem] leading-none text-deep-brown/[0.05] select-none pointer-events-none"
      >
        ZK
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        {/* Register rule — threads the hero into this section */}
        <div className="flex items-center gap-4 reveal">
          <p className="eyebrow text-rosewood-ink whitespace-nowrap">The Brand</p>
          <span className="h-px flex-1 bg-deep-brown/20" aria-hidden="true" />
          <p className="font-heading italic text-[0.95rem] text-deep-brown-soft whitespace-nowrap">
            Zulfe Khaas · by Hinaas World
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ——— Composition: layered organic blobs + still life ——— */}
          <figure className="order-2 lg:order-1 lg:col-span-5 reveal w-full max-w-md mx-auto lg:max-w-none">
            <div className="relative mx-auto w-[88%] sm:w-[78%] lg:w-[92%]">
              {/* Offset colour layers — sage up-left, rose down-right */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-eucalyptus/60"
                style={{ borderRadius: '55% 45% 58% 42% / 52% 56% 44% 48%', transform: 'translate(-7%, -6%)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-dusty-pink/55"
                style={{ borderRadius: '44% 56% 46% 54% / 58% 44% 56% 42%', transform: 'translate(7%, 7%)' }}
              />
              {/* Fine-line branch, half-hidden behind the blob */}
              <GhostBranch className="absolute -top-16 -left-14 md:-left-20 w-40 md:w-56 text-eucalyptus-deep/45 pointer-events-none" />

              {/* The photograph itself, cropped to an organic oval — no frame, no arch */}
              <div
                className="relative overflow-hidden shadow-[0_36px_70px_-32px_rgba(70,58,48,0.55),0_0_0_1px_rgba(70,58,48,0.10)]"
                style={{ borderRadius: '47% 53% 55% 45% / 56% 47% 53% 44%' }}
              >
                <img
                  src={driedFlowers}
                  alt="Dried botanicals — hydrangea, protea and eucalyptus — arranged against a pale plaster wall"
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover object-[30%_50%]"
                />
                {/* Soft inner vignette so the edge melts into the composition */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_62%,rgba(70,58,48,0.28)_100%)]"
                />
              </div>

              {/* Drawn sprig overlapping the blob's lower-left edge */}
              <LineSprig className="absolute -left-8 md:-left-14 bottom-14 w-14 md:w-20 text-rosewood-ink/85 pointer-events-none drop-shadow-[0_2px_6px_rgba(239,229,213,0.9)]" />
            </div>

            <figcaption className="mt-7 lg:ml-10 flex flex-col gap-1">
              <span className="font-body text-[0.6rem] uppercase tracking-[0.22em] text-rosewood">
                Fig. 01
              </span>
              <span className="font-heading italic text-[1.02rem] text-deep-brown-soft">
                The still-life shelf — herbs, dried and waiting
              </span>
              {atmosphereCredit && (
                <a
                  href={atmosphereCredit.landingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-[0.55rem] uppercase tracking-[0.18em] text-deep-brown-soft/60 hover:text-rosewood transition-colors"
                >
                  Photo: {atmosphereCredit.author} · {atmosphereCredit.licenceShort}
                </a>
              )}
            </figcaption>
          </figure>

          {/* ——— Copy: display type, drop cap, dotted contents index ——— */}
          <div className="order-1 lg:order-2 lg:col-span-7 reveal" style={{ '--reveal-delay': '140ms' }}>
            <h2
              id="meet"
              className="font-heading text-deep-brown leading-[0.96] tracking-[-0.01em]"
            >
              <span className="block text-[clamp(1.6rem,3.2vw,2.4rem)] font-normal text-deep-brown-soft/90 mb-1 md:mb-2">
                Meet
              </span>
              <span className="relative inline-block text-[clamp(3.1rem,8vw,5.4rem)]">
                <span className="italic font-normal text-rosewood">Zulfe Khaas</span>
                {/* Hand-drawn underline, sage — one sweep, not a rule */}
                <svg
                  viewBox="0 0 320 22"
                  aria-hidden="true"
                  className="absolute left-0 -bottom-3 md:-bottom-4 w-[96%] h-4 md:h-5 text-eucalyptus-deep/80"
                  fill="none"
                >
                  <path
                    d="M6 14C70 8 132 10 186 12c46 1.6 84-1.4 126-5"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M228 12c22-0.8 42-1.6 62-3.4"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-8 md:mt-10 font-heading text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug text-deep-brown text-balance max-w-xl">
              One house. One oil. Twenty-seven herbs.
            </p>

            <div className="mt-5 flex flex-col gap-4 font-body text-deep-brown-soft leading-relaxed max-w-xl">
              <p className="zk-dropcap">
                Zulfe Khaas began with a simple belief — that hair care should feel like a
                ritual, not a rush. Every herb is chosen individually, simmered slowly in a
                mustard-oil base, and strained by hand.
              </p>
              <p>
                No crowded shelf of half-used bottles. One considered formula, made in small
                batches — heritage herbal craft, bottled for everyday calm.
              </p>
            </div>

            {/* Contents — dotted leaders, the editorial index */}
            <nav aria-label="On this page" className="mt-8 max-w-xl">
              <p className="eyebrow text-[0.6rem] text-rosewood-ink flex items-center gap-3">
                <BotanicalSprig className="w-10 h-auto text-rosewood/70" aria-hidden="true" />
                Contents
              </p>
              <ul className="mt-3 border-t border-deep-brown/20">
                {contents.map((item) => {
                  const inner = (
                    <>
                      <span className="font-heading italic text-rosewood/80 w-7 shrink-0 text-lg">
                        {item.index}
                      </span>
                      <span className="font-heading text-xl text-deep-brown group-hover:text-rosewood transition-colors whitespace-nowrap">
                        {item.title}
                      </span>
                      <span
                        aria-hidden="true"
                        className="grow border-b-2 border-dotted border-deep-brown/25 group-hover:border-rosewood/45 transition-colors translate-y-[-0.3em] mx-1 sm:mx-2"
                      />
                      <span className="font-body text-[0.72rem] text-deep-brown-soft/90 text-right hidden sm:inline max-w-[9.5rem] leading-tight">
                        {item.detail}
                      </span>
                      <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-rosewood/70 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )
                  const rowCls =
                    'group flex items-center gap-3 py-3.5 border-b border-deep-brown/15 px-1 sm:px-2 -mx-1 sm:-mx-2 hover:bg-ivory/60 transition-colors'

                  return (
                    <li key={item.index}>
                      {item.to.startsWith('#') ? (
                        <a href={item.to} className={rowCls}>
                          {inner}
                        </a>
                      ) : (
                        <Link to={item.to} className={rowCls}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 mt-6 font-body text-[0.72rem] uppercase tracking-[0.18em] text-rosewood hover:text-deep-brown transition-colors border-b border-rosewood/40 hover:border-deep-brown pb-0.5"
            >
              Read our story
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
