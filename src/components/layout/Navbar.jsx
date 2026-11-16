import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { InstagramIcon } from '../common/SocialIcons'
import { useBag } from '../../hooks/useBag'
import { useScrolled } from '../../hooks/useUi'
import { LogoMark, Wordmark } from '../common/BrandMarks'

const leftLinks = [
  { to: '/product', label: 'Shop' },
  { to: '/botanical-book', label: 'Botanical Book' },
]

const rightLinks = [
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const scrolled = useScrolled(32)
  const { quantity, openBag } = useBag()
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!mobileOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const linkCls = ({ isActive }) =>
    [
      'font-body text-[0.7rem] md:text-[0.72rem] uppercase tracking-[0.18em] transition-colors duration-300',
      isActive ? 'text-rosewood' : 'text-deep-brown hover:text-rosewood',
    ].join(' ')

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      ref={headerRef}
      className={[
        'fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out',
        scrolled || mobileOpen
          ? 'bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(217,208,185,0.9)]'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[var(--nav-height)] flex items-center justify-between gap-4"
      >
        <div className="hidden lg:flex items-center gap-7 flex-1 justify-end pr-4">
          {leftLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="lg:hidden p-2 -ml-2 text-deep-brown hover:text-rosewood transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
        </button>

        <Link
          to="/"
          className="flex flex-col items-center gap-0.5 group shrink-0"
          aria-label="Zulfe Khaas home"
          onClick={closeMobile}
        >
          <LogoMark
            size={28}
            className="text-deep-brown group-hover:text-rosewood transition-colors duration-300"
          />
          <Wordmark className="text-deep-brown group-hover:text-rosewood transition-colors duration-300" />
        </Link>

        <div className="hidden lg:flex items-center gap-7 flex-1 pl-4">
          {rightLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 absolute right-4 sm:right-6 lg:right-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram"
            className="hidden sm:inline-flex p-1.5 text-deep-brown hover:text-rosewood transition-colors"
          >
            <InstagramIcon size={17} />
          </a>
          <button
            type="button"
            onClick={openBag}
            aria-label={`Shopping bag, ${quantity} item${quantity === 1 ? '' : 's'}`}
            className="relative p-1.5 text-deep-brown hover:text-rosewood transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.4} />
            {quantity > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-0.5 -right-0.5 min-w-[1rem] h-4 px-1 rounded-full bg-rosewood text-cream text-[0.6rem] font-medium flex items-center justify-center leading-none"
              >
                {quantity > 9 ? '9+' : quantity}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className="lg:hidden border-t border-parchment/70 bg-ivory/98 backdrop-blur-md"
      >
        <nav aria-label="Mobile" className="px-6 py-6 flex flex-col gap-5">
          {[...leftLinks, ...rightLinks].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={closeMobile}
              className={({ isActive }) =>
                [
                  'font-heading text-2xl transition-colors',
                  isActive ? 'text-rosewood' : 'text-deep-brown',
                ].join(' ')
              }
            >
              {l.label}
            </NavLink>
          ))}
          <hr className="rule-botanical my-1" />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer noopener"
            className="font-body text-[0.7rem] uppercase tracking-[0.2em] text-deep-brown-soft inline-flex items-center gap-2"
          >
            <InstagramIcon size={15} /> Instagram
          </a>
        </nav>
      </div>
    </header>
  )
}
