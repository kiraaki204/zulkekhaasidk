import { Link } from 'react-router-dom'
import { Leaf, Flame, HandHeart, ShieldCheck, Sparkles } from 'lucide-react'
import SectionHeading from '../components/common/SectionHeading'
import { BotanicalSprig, CornerLeaf } from '../components/common/BrandMarks'
import { ButtonLink } from '../components/common/Button'
import { useReveal } from '../hooks/useUi'

const chapters = [
  {
    id: 'beginning',
    icon: Sparkles,
    eyebrow: 'Chapter One',
    title: 'The Beginning',
    body: [
      'We began with a cabinet full of half-finished bottles and a simple frustration: hair care had become cluttered, rushed, and forgettable.',
      'So we went back to what our grandmothers knew — a single warm oil, made slowly from herbs you could name. We started boiling small batches in our own kitchen, adjusting the blend herb by herb, until the oil felt like something we would proudly give to someone we love.',
      'That oil became Zulfe Khaas.',
    ],
  },
  {
    id: 'philosophy',
    icon: Leaf,
    eyebrow: 'Chapter Two',
    title: 'Our Philosophy',
    body: [
      'We believe in fewer things done better. One product. One size. One ritual that fits into real life.',
      'We are interested in traditional herbal remedies not as nostalgia, but as living craft — knowledge that has been tested across generations and deserves to be handled with care rather than hype.',
      'Our voice is warm, but our standards are exacting. We will always tell you what is inside the bottle and why it is there.',
    ],
  },
  {
    id: 'formulation',
    icon: Flame,
    eyebrow: 'Chapter Three',
    title: 'Our Formulation',
    body: [
      'Our process is deliberately unhurried. We select and purchase each of the twenty-seven herbs individually — no pre-mixed powders, no anonymous blends.',
      'The herbs are boiled in a mustard-oil base, drawing out their character over a slow flame. When the infusion is ready, we strain the mixture by hand, leaving the spent botanicals behind and keeping only the golden, herb-rich oil.',
      'That is the whole secret: good ingredients, patience, and no shortcuts.',
    ],
    link: { to: '/botanical-garden', label: 'Meet the 27 herbs' },
  },
  {
    id: 'promise',
    icon: ShieldCheck,
    eyebrow: 'Chapter Four',
    title: 'Our Promise',
    body: [
      'We promise transparency — an honest list of botanicals and honest claims about what an oil can do.',
      'We promise consistency — every batch follows the same careful method.',
      'We promise respect — for your scalp, your time, your trust, and the traditions we borrow from.',
    ],
  },
  {
    id: 'how-we-make-it',
    icon: HandHeart,
    eyebrow: 'Chapter Five',
    title: 'How We Make It',
    body: [
      'First, we source the herbs. Then we simmer them in mustard oil. Then we strain. Then we bottle in our signature 150 ml format and check each bottle before it leaves us.',
      'It is a small-scale process on purpose. We would rather make less and mean it.',
    ],
    steps: [
      'Select each of the 27 herbs individually',
      'Boil in a mustard-oil base over a slow flame',
      'Strain by hand and bottle at 150 ml',
    ],
  },
]

function Chapter({ chapter, index }) {
  const Icon = chapter.icon
  const isEven = index % 2 === 0

  return (
    <article
      id={chapter.id}
      className="reveal grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start py-14 md:py-20 border-t border-parchment/60 first:border-t-0"
      style={{ '--reveal-delay': `${index * 60}ms` }}
    >
      <div className={`lg:col-span-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-butter-soft text-deep-brown shrink-0">
            <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">{chapter.eyebrow}</p>
            <h2 className="font-heading text-[clamp(1.75rem,3vw,2.4rem)] text-deep-brown mt-1">
              {chapter.title}
            </h2>
          </div>
        </div>
        <BotanicalSprig className="w-24 h-auto text-botanical/60 mt-5" />
      </div>

      <div className={`lg:col-span-7 ${isEven ? 'lg:order-2 lg:col-start-6' : 'lg:order-1'}`}>
        <div className="flex flex-col gap-4">
          {chapter.body.map((p) => (
            <p key={p.slice(0, 32)} className="font-body text-deep-brown-soft leading-relaxed text-[1.02rem]">
              {p}
            </p>
          ))}

          {chapter.steps && (
            <ol className="mt-2 flex flex-col gap-3">
              {chapter.steps.map((s, i) => (
                <li key={s} className="flex items-start gap-4 bg-cream border border-parchment/60 px-5 py-4">
                  <span className="font-heading text-xl text-botanical leading-none pt-0.5" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-body text-sm text-deep-brown leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          )}

          {chapter.link && (
            <Link
              to={chapter.link.to}
              className="mt-2 inline-flex items-center gap-2 w-fit font-body text-[0.72rem] uppercase tracking-[0.18em] text-rosewood hover:text-deep-brown border-b border-rosewood/40 hover:border-deep-brown pb-1 transition-colors"
            >
              {chapter.link.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default function About() {
  const ref = useReveal()

  return (
    <div ref={ref} className="bg-ivory texture-parchment relative">
      <CornerLeaf className="absolute top-32 right-6 w-20 text-botanical/25 hidden lg:block" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-6 md:pt-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">About · Our Story</p>
          <h1 className="font-heading text-[clamp(2.6rem,6vw,4.25rem)] leading-[1.05] text-deep-brown mt-4 text-balance">
            We make one oil, <span className="italic text-rosewood">and we mean it.</span>
          </h1>
          <div className="mt-6 flex items-center gap-4 max-w-sm">
            <span className="h-px flex-1 bg-gradient-to-r from-parchment to-transparent" />
            <BotanicalSprig className="w-20 text-botanical" />
          </div>
          <p className="mt-6 font-body text-deep-brown-soft leading-relaxed text-[1.05rem] max-w-2xl">
            Zulfe Khaas is a small botanical hair-care house. This is our story, told the way we
            tell it to friends — honestly, and in our own voice.
          </p>
        </div>
      </header>

      {/* Chapters */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        {chapters.map((c, i) => (
          <Chapter key={c.id} chapter={c} index={i} />
        ))}

        {/* CTA */}
        <div className="reveal mt-6 bg-cream border border-parchment/70 px-6 py-12 md:px-14 md:py-16 text-center flex flex-col items-center gap-5">
          <SectionHeading
            eyebrow="Continue"
            title="The story continues in the garden"
            titleAs="h2"
            align="center"
            accent={false}
            className="items-center text-center"
          />
          <p className="font-body text-deep-brown-soft max-w-lg">
            Twenty-seven herbs, each with its own history and its own place in our blend.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-1">
            <ButtonLink to="/botanical-garden" variant="solid" size="md">
              Botanical Garden
            </ButtonLink>
            <ButtonLink to="/product" variant="outline" size="md">
              Shop the Oil
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}
