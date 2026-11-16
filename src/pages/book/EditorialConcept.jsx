import { BotanicalSprig } from '../../components/common/BrandMarks'
import { Page, Kicker, DisplayTitle, Section, PullQuote, ArtPanel } from './EditorialPages'

function renderSpread(herb) {
  const [meet, hair, uses, why, fact] = herb.sections

  if (herb.composition === 'illustration-led') {
    return {
      left: (
        <Page>
          <Kicker herb={herb} />
          <div className="mt-8">
            <h3 className="book-label">{meet.n} — {meet.title}</h3>
            <p className="mt-3 font-body text-[0.95rem] leading-[1.75] text-deep-brown-soft max-w-md">{meet.body}</p>
          </div>
          <div className="mt-8">
            <h3 className="book-label">{hair.n} — {hair.title}</h3>
            <p className="mt-3 font-body text-[0.95rem] leading-[1.75] text-deep-brown-soft max-w-md">{hair.body}</p>
          </div>
          <div className="mt-auto pt-8">
            <p className="font-heading italic text-sm text-deep-brown-soft">Drawn for the Zulfe Khaas herbarium · Plate {herb.plate}</p>
          </div>
        </Page>
      ),
      right: (
        <Page>
          <Kicker herb={herb} />
          <DisplayTitle herb={herb} />
          <div className="mt-7 grid gap-6">
            <Section s={uses} size="lg" />
            <Section s={why} />
          </div>
          <PullQuote s={fact} />
        </Page>
      ),
    }
  }

  if (herb.composition === 'text-led') {
    return {
      left: (
        <Page>
          <Kicker herb={herb} />
          <DisplayTitle herb={herb} />
          <div className="mt-7 grid gap-6">
            <Section s={hair} size="lg" />
            <Section s={uses} />
          </div>
        </Page>
      ),
      right: (
        <Page>
          <Kicker herb={herb} right={`Plate ${herb.plate}`} />
          <div className="mt-7">
            <ArtPanel herb={herb} />
            <p className="mt-3 font-heading italic text-sm text-deep-brown-soft">{herb.botanicalName}</p>
          </div>
          <div className="mt-7 grid gap-6">
            <Section s={why} />
            <Section s={meet} />
          </div>
          <PullQuote s={fact} />
        </Page>
      ),
    }
  }

  return {
    left: (
      <Page>
        <Kicker herb={herb} right={`Plate ${herb.plate}`} />
        <div className="mt-7 flex-1 flex items-center">
          <ArtPanel herb={herb} tall />
        </div>
        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="font-heading italic text-sm text-deep-brown-soft max-w-[16rem]">{herb.annotation}</p>
          <BotanicalSprig className="w-20 shrink-0 text-botanical/70" />
        </div>
      </Page>
    ),
    right: (
      <Page>
        <Kicker herb={herb} />
        <DisplayTitle herb={herb} />
        <div className="mt-7 grid gap-6">
          <Section s={meet} />
          <Section s={hair} />
          <Section s={why} />
        </div>
        <PullQuote s={fact} />
        <p className="mt-4 font-body text-xs leading-relaxed text-deep-brown-soft/85 italic">{uses.body} {uses.note}</p>
      </Page>
    ),
  }
}

function renderPage(herb) {
  const [meet, hair, uses, why, fact] = herb.sections
  return (
    <Page>
      <Kicker herb={herb} />
      <DisplayTitle herb={herb} />
      <div className="mt-6">
        <ArtPanel herb={herb} />
        <p className="mt-3 font-heading italic text-sm text-deep-brown-soft">{herb.annotation}</p>
      </div>
      <div className="mt-7 grid gap-6">
        <Section s={meet} />
        <Section s={hair} />
        <Section s={uses} />
        <Section s={why} />
      </div>
      <PullQuote s={fact} />
    </Page>
  )
}

function renderBack() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 bg-cream text-deep-brown-soft">
      <div className="h-px w-16 bg-parchment" aria-hidden="true" />
      <p className="font-heading text-3xl tracking-[0.3em] text-deep-brown">ZK</p>
      <p className="book-label book-label--tiny">Zulfe Khaas · Botanical Book</p>
      <div className="h-px w-16 bg-parchment" aria-hidden="true" />
    </div>
  )
}

export const editorialConcept = {
  id: 'editorial',
  boardClass: 'border border-parchment bg-ivory p-1.5 sm:p-2',
  padBoardClass: 'border border-parchment bg-ivory p-1.5',
  surfaceClass: 'bg-cream',
  renderSpread,
  renderPage,
  renderBack,
}

export default editorialConcept
