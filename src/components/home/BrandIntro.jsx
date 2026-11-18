import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { BotanicalSprig, CornerLeaf } from '../common/BrandMarks'
import { useReveal } from '../../hooks/useUi'
import driedFlowers from '../../assets/images/Dried Flowers Still Life.jpg'
import { getCredit } from '../../data/imageCredits'

const atmosphereCredit = getCredit('Dried Flowers Still Life.jpg')

const contents = [
  {
    index: '01',
    title: 'The Oil',
    detail: 'Zulfe Khaas herbal hair oil · 150 ml',
    to: '/product',
  },
  {
    index: '02',
    title: 'The Herbs',
    detail: 'Twenty-seven botanicals, hand-selected',
    to: '/botanical-book',
  },
  {
    index: '03',
    title: 'The Ritual',
    detail: 'The slow practice the oil was made for',
    to: '#ritual',
  },
]

/** Rotating editorial seal — monogram encircled by the house name. */
function HouseSeal({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="Zulfe Khaas — Herbal Hair Oil — by Hinaas World"
    >
      <defs>
        <path
          id="zk-seal-arc"
          d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          fill="none"
        />
      </defs>
      <circle cx="60" cy="60" r="59" fill="#EFE5D5" stroke="#98766D" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="#98766D" strokeOpacity="0.6" strokeWidth="0.9" strokeDasharray="1.5 3.5" />
      <g className="animate-zk-spin-slow origin-center">
        <text fontSize="10.2" letterSpacing="2.6" fill="#7E5B52" fontFamily="'DM Sans', sans-serif" fontWeight="600">
          <textPath href="#zk-seal-arc">
            ZULFE KHAAS · HERBAL HAIR OIL · BY HINAAS WORLD ·
          </textPath>
        </text>
      </g>
      <text
        x="60"
        y="70.5"
        textAnchor="middle"
        fontSize="27"
        fill="#463A30"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="500"
        letterSpacing="1"
      >
        ZK
      </text>
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
      {/* Ghost monogram — set behind the composition, not on top of it */}
      <span
        aria-hidden="true"
        className="absolute -right-8 -top-6 md:-right-4 md:top-0 font-heading text-[10rem] md:text-[15rem] leading-none text-deep-brown/[0.055] select-none pointer-events-none"
      >
        ZK
      </span>
      <CornerLeaf
        className="absolute -bottom-8 -left-8 w-36 md:w-48 text-rosewood/15 rotate-[24deg] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-16 md:pt-20 md:pb-24">
        {/* Hairline register rule — the section opener line */}
        <div className="flex items-center gap-4 reveal">
          <p className="eyebrow text-rosewood-ink whitespace-nowrap">The Brand</p>
          <span className="h-px flex-1 bg-deep-brown/20" aria-hidden="true" />
          <p className="font-heading italic text-[0.95rem] text-deep-brown-soft whitespace-nowrap">
            Zulfe Khaas · by Hinaas World
          </p>
        </div>

        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial plate — arched, captioned, sealed */}
          <figure className="lg:col-span-5 reveal max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative">
              <HouseSeal className="absolute -top-7 -right-5 md:-right-9 z-10 w-24 md:w-32 drop-shadow-[0_10px_18px_rgba(70,58,48,0.25)]" />
              <div className="zk-arch border border-deep-brown/25 bg-ivory-deep p-2 md:p-2.5 shadow-[0_28px_60px_-24px_rgba(70,58,48,0.45)]">
                <img
                  src={driedFlowers}
                  alt="Dried botanicals — hydrangea, protea and eucalyptus — arranged against a pale plaster wall"
                  loading="lazy"
                  className="zk-arch w-full aspect-[3/4] object-cover object-[50%_32%]"
                />
              </div>
            </div>
            <figcaption className="mt-5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 border-b border-deep-brown/20 pb-3">
              <span className="font-body text-[0.62rem] uppercase tracking-[0.22em] text-rosewood">
                Fig. 01
              </span>
              <span className="font-heading italic text-[0.95rem] text-deep-brown-soft sm:text-right">
                The still-life shelf — herbs, dried and waiting
              </span>
            </figcaption>
            {atmosphereCredit && (
              <a
                href={atmosphereCredit.landingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block font-body text-[0.58rem] uppercase tracking-[0.16em] text-deep-brown-soft/60 hover:text-rosewood transition-colors sm:text-right"
              >
                Photo: {atmosphereCredit.author} · {atmosphereCredit.licenceShort}
              </a>
            )}
          </figure>

          {/* Copy — display type, short paragraphs, contents index */}
          <div className="lg:col-span-7 reveal" style={{ '--reveal-delay': '140ms' }}>
            <h2
              id="meet"
              className="font-heading text-deep-brown text-[clamp(3rem,7.5vw,4.75rem)] leading-[0.97] tracking-[-0.01em]"
            >
              Meet
              <br />
              <span className="italic font-normal text-rosewood">Zulfe Khaas</span>
            </h2>

            <p className="mt-6 font-heading text-[clamp(1.35rem,2.6vw,1.9rem)] leading-snug text-deep-brown text-balance max-w-xl">
              One house. One oil. Twenty-seven herbs.
            </p>

            <div className="mt-5 flex flex-col gap-4 font-body text-deep-brown-soft leading-relaxed max-w-xl">
              <p>
                Zulfe Khaas began with a simple belief — that hair care should feel like a
                ritual, not a rush. Every herb is chosen individually, simmered slowly in a
                mustard-oil base, and strained by hand.
              </p>
              <p>
                No crowded shelf of half-used bottles. One considered formula, made in small
                batches — heritage herbal craft, bottled for everyday calm.
              </p>
            </div>

            {/* Contents — an index into the rest of the page */}
            <nav aria-label="On this page" className="mt-8 max-w-xl">
              <p className="eyebrow text-[0.6rem] text-rosewood-ink flex items-center gap-3">
                <BotanicalSprig className="w-10 h-auto text-rosewood/70" aria-hidden="true" />
                Contents
              </p>
              <ul className="mt-3 border-t border-deep-brown/20">
                {contents.map((item) => {
                  const inner = (
                    <>
                      <span className="font-heading italic text-rosewood/80 w-8 shrink-0">
                        {item.index}
                      </span>
                      <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 grow">
                        <span className="font-heading text-xl text-deep-brown group-hover:text-rosewood transition-colors">
                          {item.title}
                        </span>
                        <span className="font-body text-[0.8rem] text-deep-brown-soft/90">
                          {item.detail}
                        </span>
                      </span>
                      <ArrowRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 text-rosewood/70 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )
                  const rowCls =
                    'group flex items-center gap-4 py-3.5 border-b border-deep-brown/15 px-2 -mx-2 hover:bg-ivory/60 transition-colors'

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
