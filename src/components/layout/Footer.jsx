import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import { InstagramIcon } from '../common/SocialIcons'
import { LogoMark, Wordmark, BotanicalSprig } from '../common/BrandMarks'

const shopLinks = [
  { to: '/product', label: 'Hair Oil — 150 ml' },
  { to: '/botanical-garden', label: 'Botanical Garden' },
  { to: '/journal', label: 'Botanical Journal' },
]

const brandLinks = [
  { to: '/about', label: 'Our Story' },
  { to: '/reviews', label: 'Customer Reviews' },
  { to: '/contact', label: 'Contact & Support' },
]

const policyLinks = [
  { to: '/contact', label: 'Shipping & Delivery' },
  { to: '/contact', label: 'Returns' },
  { to: '/contact', label: 'Privacy' },
  { to: '/contact', label: 'Terms' },
]

function FooterColumn({ title, links }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="eyebrow text-parchment-light/90 !text-[0.65rem]">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={`${l.label}-${l.to}`}>
            <Link
              to={l.to}
              className="font-body text-[0.85rem] text-ivory/75 hover:text-butter transition-colors duration-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-ivory texture-parchment relative">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link to="/" className="inline-flex items-center gap-3 group w-fit" aria-label="Zulfe Khaas home">
              <LogoMark size={32} className="text-butter group-hover:text-rosewood-soft transition-colors" />
              <Wordmark className="text-ivory group-hover:text-butter transition-colors" />
            </Link>
            <p className="font-body text-sm text-ivory/65 max-w-xs leading-relaxed">
              Editorial botanical hair care. One oil, twenty-seven herbs, one careful ritual.
            </p>
            <BotanicalSprig className="w-28 h-auto text-botanical/50 mt-1" />
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <FooterColumn title="Shop" links={shopLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Brand" links={brandLinks} />
          </div>
          <div className="md:col-span-2">
            <FooterColumn title="Policies" links={policyLinks} />
          </div>

          <div className="md:col-span-2 flex flex-col gap-3">
            <p className="eyebrow !text-[0.65rem] text-parchment-light/90">Connect</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-[0.85rem] text-ivory/75 hover:text-butter transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle size={14} strokeWidth={1.5} /> WhatsApp
              </a>
              <a
                href="mailto:hello@zulfekhaas.pk"
                className="font-body text-[0.85rem] text-ivory/75 hover:text-butter transition-colors inline-flex items-center gap-2"
              >
                <Mail size={14} strokeWidth={1.5} /> Email
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-body text-[0.85rem] text-ivory/75 hover:text-butter transition-colors inline-flex items-center gap-2"
              >
                <InstagramIcon size={14} strokeWidth={1.5} /> Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[0.7rem] tracking-[0.12em] uppercase text-ivory/45">
            © {year} Zulfe Khaas. All rights reserved.
          </p>
          <p className="font-heading italic text-sm text-ivory/40">
            Crafted with warmth across Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}
