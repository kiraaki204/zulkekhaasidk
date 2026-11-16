import { BotanicalSprig } from '../../components/common/BrandMarks'
import { Page, Head, Folio, Title, Section, SpecimenFrame, MarginNote, FactPanel } from './HybridPages'

function renderSpread(herb) {
  const [meet, hair, uses, why, fact] = herb.sections

  if (herb.composition === 'illustration-led') {
    return {
      left: (
        <Page>
          <Head herb={herb} />
          <SpecimenFrame herb={herb} />
          <div className="mt-5">
            <Section s={meet} className="border-t-0 pt-0" />
          </div>
          <div className="mt-4">
            <MarginNote text={herb.annotation} />
          </div>
          <Folio herb={herb} side="left" />
        </Page>
      ),
      right: (
        <Page>
          <Head herb={herb} />
          <Title herb={herb} />
          <div className="mt-5 flex flex-col gap-3.5">
            <Section s={hair} className="border-t-0 pt-0" />
            <Section s={uses} />
            <Section s={why} />
            <FactPanel s={fact} />
          </div>
          <Folio herb={herb} side="right" />
        </Page>
      ),
    }
  }

  if (herb.composition === 'text-led') {
    return {
      left: (
        <Page>
          <Head herb={herb} />
          <Title herb={herb} />
          <div className="mt-5 flex flex-col gap-3.5">
            <Section s={hair} className="border-t-0 pt-0" />
            <Section s={uses} />
            <Section s={meet} />
          </div>
          <Folio herb={herb} side="left" />
        </Page>
      ),
      right: (
        <Page>
          <Head herb={herb} />
          <div className="mt-5 flex gap-4">
            <SpecimenFrame herb={herb} size="sm" />
            <div className="hidden sm:flex flex-1 items-start justify-end pt-6">
              <BotanicalSprig className="w-24 text-botanical/60" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3.5">
            <Section s={why} className="border-t-0 pt-0" />
            <FactPanel s={fact} />
            <MarginNote text={herb.annotation} />
          </div>
          <Folio herb={herb} side="right" />
        </Page>
      ),
    }
  }

  return {
    left: (
      <Page>
        <Head herb={herb} />
        <div className="mt-5 relative">
          <SpecimenFrame herb={herb} />
          <div className="mt-3 flex items-start gap-3">
            <span className="mt-2 h-px w-8 shrink-0 bg-botanical-deep/60" aria-hidden="true" />
            <MarginNote text={herb.annotation} />
          </div>
        </div>
        <div className="mt-4 border border-parchment/70 px-3.5 py-2.5">
          <p className="book-label book-label--tiny">Specimen {String(herb.entryNo).padStart(2, '0')} · {herb.family}</p>
          <p className="font-heading text-lg leading-tight mt-0.5 text-deep-brown">{herb.name}</p>
        </div>
        <Folio herb={herb} side="left" />
      </Page>
    ),
    right: (
      <Page>
        <Head herb={herb} />
        <Title herb={herb} intro={meet.body} />
        <div className="mt-5 flex flex-col gap-3.5">
          <Section s={hair} className="border-t-0 pt-0" />
          <Section s={uses} />
          <Section s={why} />
          <FactPanel s={fact} />
        </div>
        <Folio herb={herb} side="right" />
      </Page>
    ),
  }
}

function renderPage(herb) {
  const [meet, hair, uses, why, fact] = herb.sections
  return (
    <Page>
      <Head herb={herb} />
      <Title herb={herb} />
      <SpecimenFrame herb={herb} size={herb.composition === 'text-led' ? 'sm' : 'lg'} />
      <div className="mt-5 flex flex-col gap-3.5">
        <Section s={meet} className="border-t-0 pt-0" />
        <Section s={hair} />
        <Section s={uses} />
        <Section s={why} />
        <FactPanel s={fact} />
        <MarginNote text={herb.annotation} />
      </div>
      <Folio herb={herb} side="left" />
    </Page>
  )
}

function renderBack() {
  return (
    <div className="paper-hybrid relative flex h-full flex-col items-center justify-center gap-3 text-deep-brown-soft">
      <div className="pointer-events-none absolute inset-2 border border-parchment/70" aria-hidden="true" />
      <BotanicalSprig className="w-24 text-botanical/60" />
      <p className="book-label book-label--tiny">Zulfe Khaas · Botanical Book</p>
      <span className="h-px w-14 bg-parchment" aria-hidden="true" />
      <p className="font-heading italic text-sm">Herbarium, Vol. I</p>
    </div>
  )
}

export const hybridConcept = {
  id: 'hybrid',
  boardClass: 'bg-deep-brown/90 p-1.5 sm:p-2.5',
  padBoardClass: 'bg-deep-brown/90 p-1.5',
  surfaceClass: 'bg-[#f7f2e7]',
  renderSpread,
  renderPage,
  renderBack,
}

export default hybridConcept
