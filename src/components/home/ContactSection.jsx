import { useState } from 'react'
import { MessageCircle, Mail } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import { Button } from '../common/Button'
import { useReveal } from '../../hooks/useUi'

export default function ContactSection() {
  const ref = useReveal()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // Frontend-only acknowledgement until backend endpoint exists
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      aria-labelledby="home-contact"
      className="py-20 md:py-28 bg-ivory"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5 reveal">
            <SectionHeading
              eyebrow="Contact"
              title="We are here to help"
              titleAs="h2"
              id="home-contact"
            >
              Questions about the oil, your order, or the herbs? Reach out — we read every note.
            </SectionHeading>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 bg-botanical/15 border border-botanical/30 px-5 py-4 hover:bg-botanical/25 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-botanical-deep text-cream flex items-center justify-center shrink-0">
                  <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-body text-[0.65rem] uppercase tracking-[0.16em] text-deep-brown-soft">
                    Primary
                  </span>
                  <span className="block font-heading text-lg text-deep-brown group-hover:text-rosewood transition-colors">
                    WhatsApp us
                  </span>
                </span>
              </a>

              <a
                href="mailto:hello@zulfekhaas.pk"
                className="group flex items-center gap-4 border border-parchment px-5 py-4 hover:border-rosewood/50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-parchment flex items-center justify-center shrink-0 text-deep-brown">
                  <Mail size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-body text-[0.65rem] uppercase tracking-[0.16em] text-deep-brown-soft">
                    Email
                  </span>
                  <span className="block font-heading text-lg text-deep-brown group-hover:text-rosewood transition-colors">
                    hello@zulfekhaas.pk
                  </span>
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 reveal" style={{ '--reveal-delay': '100ms' }}>
            <form
              onSubmit={onSubmit}
              className="bg-cream border border-parchment/70 px-6 py-8 md:px-9 md:py-10 flex flex-col gap-5"
              noValidate={false}
            >
              <p className="eyebrow">Send a note</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-deep-brown-soft/90 focus:border-rosewood focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-deep-brown-soft/90 focus:border-rosewood focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="bg-ivory border border-parchment px-4 py-3 font-body text-sm text-deep-brown placeholder:text-deep-brown-soft/90 focus:border-rosewood focus:outline-none transition-colors resize-y min-h-[120px]"
                  placeholder="How can we help?"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4 mt-1">
                <Button type="submit" variant="solid" size="md">
                  {submitted ? 'Note received' : 'Send message'}
                </Button>
                {submitted && (
                  <p className="font-body text-sm text-botanical-deep" role="status">
                    Thank you — we will reply soon.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
