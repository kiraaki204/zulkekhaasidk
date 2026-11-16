import { HerbArt } from './HerbArt'
import { BotanicalSprig } from '../../components/common/BrandMarks'
import { Page, RunningHead, Folio, TitleBlock, Plate, SpecimenLabel, Section, FactBox, Annotation } from './VintagePages'

function renderSpread(herb) {
  const meet = herb.sections[0]
  const hair = herb.sections[1]
  const uses = herb.sections[2]
  const why = herb.sections[3]
  const fact = herb.sections[4]

  if (herb.composition === 'illustration-led') {
    return {
      left: (
        <Page>
          <RunningHead herb={herb} />
          <Plate herb={herb} />
          <div className="mt-5">
            <Section s={meet} className="border-t-0 pt-0" />
          </div>
          <Folio herb={herb} side="left" />
        </Page>
      ),
      right: (
        <Page>
          <RunningHead herb={herb} />
          <TitleBlock herb={herb} />
          <div className="mt-5 flex flex-col gap-3.5">
            <Section s={hair} className="border-t-0 pt-0" />
            <Section s={uses} />
            <Section s={why} />
            <FactBox s={fact} />
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
          <RunningHead herb={herb} />
          <TitleBlock herb={herb} />
          <div className="mt-5 flex flex-col gap-3.5">
            <Section s={meet} className="border-t-0 pt-0" />
            <Section s={hair} />
            <Section s={uses} />
          </div>
          <Folio herb={herb} side="left" />
        </Page>
      ),
      right: (
        <Page>
          <RunningHead herb={herb} />
          <Plate herb={herb} size="sm" />
          <div className="mt-4 flex flex-col gap-3.5">
            <Section s={why} className="border-t-0 pt-0" />
            <FactBox s={fact} />
            <div className="border-t border-deep-brown/20 pt-3">
              <Annotation text={herb.annotation} />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <BotanicalSprig className="w-24 text-botanical/70" />
          </div>
          <Folio herb={herb} side="right" />
        </Page>
      ),
    }
  }

  return {
    left: (
      <Page>
        <RunningHead herb={herb} />
        <div className="relative mt-5">
          <div className="border border-deep-brown/35 bg-butter-soft/30 p-2.5">
            <div className="flex items-center justify-center border border-deep-brown/20 py-5 min-h-[220px] md:min-h-[270px]">
              <HerbArt slug={herb.slug} className="w-36 md:w-48 h-auto text-botanical-deep" />
            </div>
          </div>
          <Annotation text={herb.annotation} className="mt-3" />
        </div>
        <SpecimenLabel herb={herb} className="mt-5 w-fit" />
        <Folio herb={herb} side="left" />
      </Page>
    ),
    right: (
      <Page>
        <RunningHead herb={herb} />
        <TitleBlock herb={herb} />
        <div className="mt-5 flex flex-col gap-3.5">
          <Section s={meet} className="border-t-0 pt-0" />
          <Section s={hair} />
          <Section s={uses} />
          <Section s={why} />
          <FactBox s={fact} />
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
      <RunningHead herb={herb} />
      <TitleBlock herb={herb} />
      <Plate herb={herb} size={herb.composition === 'text-led' ? 'sm' : 'lg'} />
      {herb.composition === 'specimen-led' && <SpecimenLabel herb={herb} className="mt-4 w-fit" />}
      <div className="mt-5 flex flex-col gap-3.5">
        <Section s={meet} className="border-t-0 pt-0" />
        <Section s={hair} />
        <Section s={uses} />
        <Section s={why} />
        <FactBox s={fact} />
        <Annotation text={herb.annotation} />
      </div>
      <Folio herb={herb} side="left" />
    </Page>
  )
}

function renderBack() {
  return (
    <div className="paper-vintage relative flex h-full flex-col items-center justify-center gap-3 text-deep-brown-soft">
      <div className="pointer-events-none absolute inset-2.5 border border-deep-brown/25" aria-hidden="true" />
      <BotanicalSprig className="w-24 text-botanical/60" />
      <p className="book-label book-label--tiny">Zulfe Khaas · Botanical Book</p>
      <p className="font-heading italic text-sm">Twenty-seven herbs, one volume</p>
    </div>
  )
}

export const vintageConcept = {
  id: 'vintage',
  boardClass: 'book-board p-2 sm:p-3 md:p-4',
  padBoardClass: 'book-board p-2',
  surfaceClass: 'bg-[#f2e9d4]',
  renderSpread,
  renderPage,
  renderBack,
}

export default vintageConcept
