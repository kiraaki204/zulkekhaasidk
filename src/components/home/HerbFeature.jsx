import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { herbs } from '../../data/herbs'
import SectionHeading from '../common/SectionHeading'
import { ButtonLink } from '../common/Button'
import { useReveal } from '../../hooks/useUi'
import Constellation from './constellations'

export default function HerbFeature() {
  const ref = useReveal()
  const [selected, setSelected] = useState(herbs[0])
  const preview = useMemo(() => selected ?? herbs[0], [selected])

  return (
    <section
      ref={ref}
      aria-labelledby="herb-feature"
      className="py-20 md:py-28 bg-ivory relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 reveal">
          <SectionHeading
            eyebrow="Interactive Botanicals"
            title="A constellation of twenty-seven"
            titleAs="h2"
            align="center"
            id="herb-feature"
            className="items-center text-center"
          />
          <p className="font-body text-deep-brown-soft max-w-xl leading-relaxed">
            Every herb in Zulfe Khaas has a story — traditional uses, a relationship with hair,
            and a role in our formulation. Tap any name to begin.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="reveal">
            <Constellation activeId={preview?.id} onSelect={setSelected} />
          </div>

          <article
            className="reveal bg-cream border border-parchment/70 px-6 py-8 md:px-9 md:py-10"
            style={{ '--reveal-delay': '100ms' }}
            aria-live="polite"
          >
            <p className="eyebrow">Herb Profile</p>
            <h3 className="font-heading text-[clamp(1.75rem,3vw,2.35rem)] text-deep-brown mt-2">
              {preview.name}
            </h3>
            <p className="font-heading italic text-rosewood text-sm mt-1">
              {preview.botanicalName}
            </p>

            <dl className="mt-6 flex flex-col gap-4">
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Traditional Uses</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.traditionalUses}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">Relationship with Hair</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.hairRelationship}
                </dd>
              </div>
              <div>
                <dt className="eyebrow !text-[0.6rem] !text-botanical-deep">In Zulfe Khaas</dt>
                <dd className="font-body text-sm text-deep-brown-soft leading-relaxed mt-1">
                  {preview.roleInFormulation}
                </dd>
              </div>
            </dl>

            <div className="mt-8 pt-5 border-t border-parchment/60 flex flex-wrap gap-4">
              <ButtonLink to="/botanical-book" variant="solid" size="sm">
                Open the Botanical Book
                <ArrowRight size={13} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
