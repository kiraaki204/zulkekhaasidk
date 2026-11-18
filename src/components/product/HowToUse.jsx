import { Droplets, Hand, Moon } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'

const steps = [
  {
    step: '01',
    icon: Hand,
    title: 'Warm the oil',
    text: 'Pour a small amount into your palm and rub gently to warm it — a quiet pause before the ritual begins.',
  },
  {
    step: '02',
    icon: Droplets,
    title: 'Massage the scalp',
    text: 'Work in soft circles from crown to temples. Let the twenty-seven herbs settle at the roots.',
  },
  {
    step: '03',
    icon: Moon,
    title: 'Rest, then wash',
    text: 'Leave for at least an hour — or overnight for deeper care — then cleanse gently and rinse thoroughly.',
  },
]

export default function HowToUse({ compact = false }) {
  return (
    <section aria-labelledby="how-to-use" className="py-14 md:py-20 border-t border-parchment/60">
      <div className="max-w-3xl">
        <SectionHeading
          eyebrow="Ritual"
          title="How to Use"
          titleAs="h2"
          id="how-to-use"
        />
      </div>

      <ol className={`mt-8 grid gap-5 ${compact ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 md:grid-cols-3'}`}>
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <li
              key={s.step}
              className="relative bg-cream border border-parchment/60 px-5 py-6 group hover:border-botanical/60 transition-colors duration-500"
            >
              <span
                className="absolute top-4 right-4 font-heading text-[2rem] leading-none text-parchment/60 group-hover:text-butter transition-colors"
                aria-hidden="true"
              >
                {s.step}
              </span>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-butter-soft text-deep-brown mb-4">
                <Icon size={17} strokeWidth={1.4} aria-hidden="true" />
              </span>
              <h3 className="font-heading text-lg text-deep-brown">{s.title}</h3>
              <p className="font-body text-sm text-deep-brown-soft leading-relaxed mt-2">
                {s.text}
              </p>
              {i < steps.length - 1 && (
                <span
                  className="hidden md:block absolute top-1/2 -right-3 text-botanical text-lg"
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
