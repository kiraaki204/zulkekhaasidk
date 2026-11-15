import { useCallback, useEffect, useState } from 'react'
import { ChevronDown, Mail, MessageCircle, Phone, X } from 'lucide-react'
import { useReveal } from '../hooks/useUi'
import { BotanicalSprig } from '../components/common/BrandMarks'
import { Button } from '../components/common/Button'

const helpCategories = [
  {
    id: 'product',
    title: 'Product',
    blurb: 'Ingredients, size, shelf life, and what the oil is made for.',
    items: [
      { q: 'What is in Zulfe Khaas?', a: 'Twenty-seven individual botanicals simmered in a mustard-oil base. The full list is profiled in the Botanical Garden.' },
      { q: 'What size is the bottle?', a: 'One size: 150 ml of herbal hair oil.' },
      { q: 'How long does a bottle last?', a: 'With two to three uses per week, most customers find a bottle lasts five to eight weeks.' },
    ],
  },
  {
    id: 'using',
    title: 'Using Your Oil',
    blurb: 'Ritual, frequency, and how to get the most from each bottle.',
    items: [
      { q: 'How often should I use it?', a: 'Two to three times a week is a gentle starting point; daily scalp massage also works if your scalp enjoys it.' },
      { q: 'How long should I leave it in?', a: 'At least one hour. Overnight, with a light pillowcloth, gives a deeper ritual.' },
      { q: 'Can I mix it with other oils?', a: 'We formulated it to stand alone. If you blend, patch-test first and keep additions simple.' },
    ],
  },
  {
    id: 'orders',
    title: 'Orders & Delivery',
    blurb: 'Shipping timelines, coverage, and tracking.',
    items: [
      { q: 'Where do you deliver?', a: 'Nationwide across Pakistan. Courier arrangements are confirmed at checkout.' },
      { q: 'How long does delivery take?', a: 'Typically 2–5 working days depending on city; remote areas may take longer.' },
      { q: 'How will I know my order status?', a: 'You receive confirmation by email or WhatsApp with your order reference.' },
    ],
  },
  {
    id: 'returns',
    title: 'Returns',
    blurb: 'If something arrives wrong or damaged.',
    items: [
      { q: 'What if my bottle arrives damaged?', a: 'Contact us within 48 hours of delivery with a photograph and your order reference — we will make it right.' },
      { q: 'Can I return an opened bottle?', a: 'For hygiene reasons, opened bottles cannot be returned unless faulty or damaged in transit.' },
      { q: 'How are refunds issued?', a: 'Refunds are returned via the original payment method or store credit, decided case by case.' },
    ],
  },
]

function HelpModal({ category, onClose }) {
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    if (!category) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [category, onClose])

  if (!category) return null

  return (
    <div className="fixed inset-0 z-[65] flex items-end md:items-center justify-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="help-title">
      <button type="button" className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" aria-label="Close panel" onClick={onClose} />
      <div className="relative bg-ivory w-full md:max-w-lg max-h-[88vh] overflow-y-auto border border-parchment/70 shadow-2xl" style={{ animation: 'page-fade 0.3s ease both' }}>
        <div className="sticky top-0 bg-ivory/97 backdrop-blur border-b border-parchment/60 px-6 py-4 flex items-start justify-between gap-4 z-10">
          <div>
            <p className="eyebrow !text-[0.62rem]">Help</p>
            <h2 id="help-title" className="font-heading text-2xl text-deep-brown mt-1">{category.title}</h2>
            <p className="font-body text-xs text-deep-brown-soft mt-1">{category.blurb}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="p-2 -mr-2 -mt-1 text-deep-brown hover:text-rosewood transition-colors">
            <X size={20} strokeWidth={1.4} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-2">
          {category.items.map((item) => {
            const open = openId === item.q
            return (
              <div key={item.q} className="border-b border-parchment/60 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.q)}
                  className="w-full flex items-center justify-between gap-4 py-4 text-left group"
                >
                  <span className="font-heading text-lg text-deep-brown group-hover:text-rosewood transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    className={`shrink-0 text-deep-brown-soft transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div hidden={!open} className="pb-4 -mt-1">
                  <p className="font-body text-sm text-deep-brown-soft leading-relaxed">{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-6 py-4 border-t border-parchment/60 flex flex-wrap gap-4">
          <a href="https://wa.me/" target="_blank" rel="noreferrer noopener" className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-rosewood hover:text-deep-brown transition-colors border-b border-rosewood/40 pb-0.5">
            Ask on WhatsApp →
          </a>
          <a href="mailto:hello@zulfekhaas.pk" className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors border-b border-parchment pb-0.5">
            Email us →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useReveal()
  const [activeHelp, setActiveHelp] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    setSubmitted(true)
  }, [])

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-8 md:pt-20">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Contact & Support</p>
          <h1 className="font-heading text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] text-deep-brown mt-4 text-balance">
            A boutique line, <span className="italic text-rosewood">kept open</span>
          </h1>
          <BotanicalSprig className="w-28 h-auto text-botanical/70 mt-5" />
          <p className="mt-5 font-body text-deep-brown-soft leading-relaxed max-w-2xl">
            WhatsApp is where we answer fastest. Email works for anything with photographs or
            order references — and the form below reaches the same inbox.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {/* Contact methods */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 reveal flex flex-col gap-4">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-4 bg-botanical/15 border border-botanical/30 px-6 py-5 hover:bg-botanical/25 transition-colors"
            >
              <span className="w-12 h-12 rounded-full bg-botanical text-cream flex items-center justify-center shrink-0">
                <MessageCircle size={20} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block font-body text-[0.65rem] uppercase tracking-[0.16em] text-deep-brown-soft">
                  Primary · fastest reply
                </span>
                <span className="block font-heading text-xl text-deep-brown group-hover:text-rosewood transition-colors">
                  WhatsApp
                </span>
              </span>
            </a>

            <a
              href="mailto:hello@zulfekhaas.pk"
              className="group flex items-center gap-4 border border-parchment px-6 py-5 hover:border-rosewood/50 transition-colors"
            >
              <span className="w-12 h-12 rounded-full border border-parchment flex items-center justify-center shrink-0 text-deep-brown">
                <Mail size={19} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-body text-[0.65rem] uppercase tracking-[0.16em] text-deep-brown-soft">
                  Email
                </span>
                <span className="block font-heading text-xl text-deep-brown group-hover:text-rosewood transition-colors break-all">
                  hello@zulfekhaas.pk
                </span>
              </span>
            </a>

            <div className="flex items-center gap-4 border border-dashed border-parchment px-6 py-4 opacity-80">
              <Phone size={17} strokeWidth={1.5} className="text-deep-brown-soft shrink-0" aria-hidden="true" />
              <p className="font-body text-sm text-deep-brown-soft">
                Direct phone line — to be confirmed and added here.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 reveal" style={{ '--reveal-delay': '80ms' }}>
            <form onSubmit={onSubmit} className="bg-cream border border-parchment/70 px-6 py-8 md:px-9 md:py-10 flex flex-col gap-5">
              <p className="eyebrow">Website contact form</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Topic</span>
                <select
                  name="topic"
                  defaultValue="general"
                  className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown focus:border-rosewood focus:outline-none transition-colors"
                >
                  <option value="general">General question</option>
                  <option value="product">Product</option>
                  <option value="using">Using your oil</option>
                  <option value="orders">Orders & delivery</option>
                  <option value="returns">Returns</option>
                </select>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors resize-y min-h-[120px]"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4 mt-1">
                <Button type="submit" variant="solid" size="md">
                  {submitted ? 'Message received' : 'Send message'}
                </Button>
                {submitted && (
                  <p className="font-body text-sm text-botanical-deep" role="status">
                    Thank you — we reply to every note.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Help collection */}
        <section aria-labelledby="help-collection" className="mt-16 md:mt-24 reveal">
          <div className="flex items-center gap-4">
            <p id="help-collection" className="eyebrow">How can we help?</p>
            <span className="h-px flex-1 bg-parchment/70" />
          </div>

          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpCategories.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveHelp(c)}
                  aria-haspopup="dialog"
                  className="group w-full h-full text-left bg-cream border border-parchment/60 px-5 py-6 flex flex-col gap-3 min-h-[9rem] hover:border-botanical/70 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="font-heading text-xl text-deep-brown group-hover:text-rosewood transition-colors">
                    {c.title}
                  </span>
                  <span className="font-body text-sm text-deep-brown-soft leading-relaxed flex-1">
                    {c.blurb}
                  </span>
                  <span className="font-body text-[0.62rem] uppercase tracking-[0.14em] text-deep-brown-soft group-hover:text-rosewood transition-colors">
                    Open panel →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <HelpModal category={activeHelp} onClose={() => setActiveHelp(null)} />
    </div>
  )
}
