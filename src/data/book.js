import { herbs } from './herbs'

const SAMPLE_SLUGS = ['bhringraj', 'amla', 'hibiscus']

const FAMILIES = {
  bhringraj: 'Asteraceae',
  amla: 'Phyllanthaceae',
  hibiscus: 'Malvaceae',
}

const ANNOTATIONS = {
  bhringraj: 'Fresh paste, applied before oiling — a classical head-oil ritual.',
  amla: 'Dried fruit: a pantry and beauty staple across South Asia for centuries.',
  hibiscus: 'Ground leaves give a naturally mucilaginous, slippery texture.',
}

const SPECIMEN_NOTES = {
  bhringraj: 'Fresh paste · pre-oil ritual',
  amla: 'Dried fruit · pantry staple',
  hibiscus: 'Petals & leaves · mucilaginous',
}

const COMPOSITIONS = ['illustration-led', 'text-led', 'specimen-led']

const sampleHerbs = SAMPLE_SLUGS.map((slug) => herbs.find((h) => h.slug === slug))

export const bookHerbs = sampleHerbs.map((herb, index) => ({
  ...herb,
  index,
  entryNo: index + 1,
  plate: ['I', 'II', 'III'][index],
  family: FAMILIES[herb.slug],
  annotation: ANNOTATIONS[herb.slug],
  specimenNote: SPECIMEN_NOTES[herb.slug],
  composition: COMPOSITIONS[index],
  sections: [
    {
      key: 'meet',
      n: '01',
      title: 'Meet the Herb',
      body: `${herb.name} (${herb.botanicalName}) — one of the twenty-seven botanicals chosen individually for Zulfe Khaas.`,
    },
    { key: 'hair', n: '02', title: 'Relationship with Hair', body: herb.hairRelationship },
    {
      key: 'uses',
      n: '03',
      title: 'Traditional Uses',
      body: herb.traditionalUses,
      note: 'Traditional use reflects historical and folk practice — not a claim of clinical effect.',
    },
    { key: 'why', n: '04', title: "Why It's in Zulfe Khaas", body: herb.roleInFormulation },
    { key: 'fact', n: '05', title: 'Did You Know?', body: herb.didYouKnow },
  ],
}))

export const concepts = [
  { id: 'vintage', letter: 'A', label: 'Realistic Vintage Book', hint: 'Aged paper, plates, annotations' },
  { id: 'editorial', letter: 'B', label: 'Luxury Editorial Journal', hint: 'Typography, whitespace, calm' },
  { id: 'hybrid', letter: 'C', label: 'Hybrid Botanical Book', hint: 'Structure meets refinement' },
]

export const DEFAULT_CONCEPT = 'vintage'

export function isConcept(id) {
  return concepts.some((c) => c.id === id)
}
