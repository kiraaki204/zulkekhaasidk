import { Droplets, Hand, Sun } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { useReveal } from '../../hooks/useUi'

const steps = [
  {
    icon: Hand,
    step: '01',
    title: 'Warm a few drops',
    text: 'Pour a small amount into your palms and rub gently to warm the oil — a quiet pause before you begin.',
  },
  {
    icon: Droplets,
    step: '02',
    title: 'Massage into the scalp',
    text: 'Work in soft circles from the crown outward. Let the botanicals settle at the roots where care begins.',
  },
  {
    icon: Sun,
    step: '03',
    title: 'Rest, then rinse',
    text: 'Leave for at least an hour — or overnight for a deeper ritual — then wash out with a gentle cleanse.',
  },
]

export default function Ritual() {
  const ref = useReveal()

  return (
    <section
      ref={ref}
      aria-labelledby="ritual"
      className="py-20 md:py-28 bg-cream texture-parchment relative"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl reveal">
          <SectionHeading
            eyebrow="How to Use"
            title="The hair-care ritual"
            titleAs="h2"
            id="ritual"
          >
            Three unhurried steps. Designed to fit a weekday evening or a slow Sunday morning.
          </SectionHeading>
        </div>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <li
                key={s.step}
                className="reveal relative bg-ivory border border-parchment/60 px-6 py-8 md:px-7 md:py-9 group hover:border-botanical/60 transition-colors duration-500"
                style={{ '--reveal-delay': `${i * 120}ms` }}
              >
                <span
                  className="absolute top-5 right-5 font-heading text-[2.5rem] leading-none text-parchment/60 group-hover:text-butter/80 transition-colors duration-500"
                  aria-hidden="true"
                >
                  {s.step}
                </span>

                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-butter-soft text-deep-brown mb-5">
                  <Icon size={18} strokeWidth={1.4} aria-hidden="true" />
                </span>

                <h3 className="font-heading text-xl text-deep-brown">{s.title}</h3>
                <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-3">
                  {s.text}
                </p>
              </li>
            )
          })}
        </ol>

        <p className="mt-10 font-body text-[0.72rem] uppercase tracking-[0.16em] text-deep-brown-soft/80 text-center reveal">
          Confirmed product instructions will replace these steps as they become available
        </p>
      </div>
    </section>
  )
}
