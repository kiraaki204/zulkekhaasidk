import { Link } from 'react-router-dom'
import { CornerLeaf } from '../common/BrandMarks'
import SectionHeading from '../common/SectionHeading'
import { useReveal } from '../../hooks/useUi'

const pillars = [
  {
    label: 'Slow craft',
    text: 'Each batch is simmered and strained with patience — never rushed to hit a shelf quota.',
  },
  {
    label: 'Honest botanicals',
    text: 'Twenty-seven herbs, selected individually. We tell you what is inside, and why.',
  },
  {
    label: 'One ritual',
    text: 'We believe a single considered oil outperforms a cabinet of half-tried products.',
  },
]

export default function Philosophy() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="philosophy"
      className="py-20 md:py-28 bg-dusty-pink/30 relative overflow-hidden"
    >
      <CornerLeaf
        className="absolute -bottom-6 -left-4 w-28 text-botanical/25 rotate-90 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 reveal">
            <SectionHeading
              eyebrow="Our Philosophy"
              title="What we stand behind"
              titleAs="h2"
              id="philosophy"
            >
              <p>
                Zulfe Khaas is made in small batches for people who read the label first.
                These are the promises we hold ourselves to, every time a bottle is filled.
              </p>
            </SectionHeading>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 font-body text-[0.72rem] uppercase tracking-[0.18em] text-rosewood hover:text-deep-brown transition-colors border-b border-rosewood/40 hover:border-deep-brown pb-1"
            >
              Our full story <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 reveal" style={{ '--reveal-delay': '100ms' }}>
            {pillars.map((p, i) => (
              <article
                key={p.label}
                className={[
                  'border-t-2 px-5 py-7 h-full',
                  i === 1 ? 'bg-sage/45 border-eucalyptus-deep/70' : i === 2 ? 'bg-dusty-pink/40 border-dusty-pink-deep/70' : 'bg-cream border-botanical/50',
                ].join(' ')}
              >
                <p className="font-heading text-3xl text-deep-brown/25" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-heading text-lg text-deep-brown mt-3">{p.label}</h3>
                <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-2.5">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
