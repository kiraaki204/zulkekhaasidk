import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, Lock } from 'lucide-react'
import { product, formatPrice, orderTotals, shipping } from '../data/product'
import { api } from '../lib/api'
import { useBag } from '../hooks/useBag'
import { useReveal } from '../hooks/useUi'
import { Button } from '../components/common/Button'
import { BotanicalSprig } from '../components/common/BrandMarks'

const paymentMethods = [
  { id: 'cod', label: 'Cash on Delivery', hint: 'Pay when your parcel arrives' },
  { id: 'card', label: 'Card', hint: 'Visa / Mastercard — via secure gateway' },
  { id: 'jazzcash', label: 'JazzCash', hint: 'Mobile wallet' },
  { id: 'easypaisa', label: 'Easypaisa', hint: 'Mobile wallet' },
]

const pakistanCities = [
  'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan',
  'Peshawar', 'Quetta', 'Hyderabad', 'Gujranwala', 'Sialkot', 'Bahawalpur',
  'Sukkur', 'Sargodha', 'Abbottabad', 'Other',
]

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  province: '',
  postalCode: '',
  notes: '',
  paymentMethod: 'cod',
}

const paymentMethodMap = {
  cod: 'COD',
  card: 'CARD',
  jazzcash: 'JAZZCASH',
  easypaisa: 'EASYPAISA',
}

function validate(values) {
  const errors = {}
  if (!values.fullName.trim()) errors.fullName = 'Full name is required'
  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email'
  if (!values.phone.trim()) errors.phone = 'Phone is required'
  else if (!/^[+0-9][0-9\s-]{7,16}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number'
  if (!values.addressLine1.trim()) errors.addressLine1 = 'Address line is required'
  if (!values.city) errors.city = 'City is required'
  if (!values.province.trim()) errors.province = 'Province is required'
  return errors
}

const fieldCls = (hasError) =>
  [
    'bg-ivory border px-4 py-3 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors w-full',
    hasError ? 'border-rosewood bg-rosewood-soft/10' : 'border-parchment',
  ].join(' ')

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
        {label}
      </span>
      {children}
      {error && (
        <span className="font-body text-[0.72rem] text-rosewood" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}

export default function Checkout() {
  const ref = useReveal()
  const navigate = useNavigate()
  const { quantity, subtotal, clear } = useBag()
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const totals = orderTotals(quantity)

  useEffect(() => {
    if (quantity === 0) return undefined
    const t = window.setTimeout(() => navigate('/product', { replace: true }), 0)
    return () => window.clearTimeout(t)
  }, [quantity, navigate])

  const set = (name) => (e) => {
    const v = e.target.value
    setValues((prev) => ({ ...prev, [name]: v }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.querySelector('[role="alert"]')
      first?.closest('label')?.querySelector('input, select, textarea')?.focus()
      return
    }
    if (quantity === 0) {
      setFormError('Your bag is empty.')
      return
    }

    setSubmitting(true)
    try {
      const { product: catalogProduct } = await api.get(
        `/products/${encodeURIComponent(product.slug ?? 'zulfe-khaas-hair-oil-150')}`,
      )

      const { order } = await api.post('/orders', {
        customer: {
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
        },
        address: {
          line1: values.addressLine1.trim(),
          line2: values.addressLine2.trim(),
          city: values.city,
          province: values.province.trim(),
          postalCode: values.postalCode.trim(),
          notes: values.notes.trim(),
        },
        paymentMethod: paymentMethodMap[values.paymentMethod] ?? 'COD',
        items: [{ productId: catalogProduct.id, quantity }],
        shipping: totals.shipping,
      })

      try {
        sessionStorage.setItem(
          'zulfe-khaas-last-order',
          JSON.stringify({
            reference: order.reference,
            quantity,
            totals: {
              subtotal: order.subtotalPkr,
              shipping: order.shippingPkr,
              total: order.totalPkr,
            },
            paymentMethod: values.paymentMethod,
            name: values.fullName,
            city: values.city,
            createdAt: order.createdAt,
          }),
        )
      } catch {
        /* session storage unavailable */
      }

      clear()
      navigate('/order-success', { state: { reference: order.reference } })
    } catch (err) {
      setFormError(err.message ?? 'Could not place the order. Please try again.')
      if (err.details && Array.isArray(err.details)) {
        const first = err.details[0]
        if (first?.path) {
          const map = {
            'customer.fullName': 'fullName',
            'customer.email': 'email',
            'customer.phone': 'phone',
            'address.line1': 'addressLine1',
            'address.city': 'city',
            'address.province': 'province',
          }
          const key = map[first.path]
          if (key) setErrors((prev) => ({ ...prev, [key]: first.message }))
        }
      }
    } finally {
      setSubmitting(false)
    }
  }

  if (quantity === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 py-24 text-center bg-ivory">
        <BotanicalSprig className="w-24 text-botanical/70" />
        <h1 className="font-heading text-3xl text-deep-brown">Nothing to check out yet.</h1>
        <p className="font-body text-sm text-deep-brown-soft max-w-sm">
          Your bag is empty. Add the 150 ml herbal oil to begin.
        </p>
        <Button onClick={() => navigate('/product')} variant="solid" size="sm">
          View the Product
        </Button>
      </div>
    )
  }

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen">
      <header className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="reveal inline-flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors"
        >
          <ChevronLeft size={14} strokeWidth={1.5} aria-hidden="true" /> Back
        </button>

        <div className="reveal mt-6 flex flex-col gap-3" style={{ '--reveal-delay': '60ms' }}>
          <p className="eyebrow">Guest checkout</p>
          <h1 className="font-heading text-[clamp(2.1rem,5vw,3.25rem)] leading-tight text-deep-brown">
            Nearly there
          </h1>
          <div className="flex items-center gap-3 text-deep-brown-soft">
            <Lock size={13} strokeWidth={1.5} className="text-botanical" aria-hidden="true" />
            <p className="font-body text-sm">
              Secure guest checkout — no account required.
            </p>
          </div>
        </div>
      </header>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
      >
        {/* Left — details */}
        <div className="lg:col-span-7 reveal flex flex-col gap-10">
          <section aria-labelledby="sec-contact" className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-botanical" aria-hidden="true">01</span>
              <h2 id="sec-contact" className="font-heading text-xl md:text-2xl text-deep-brown">
                Contact information
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full name" error={errors.fullName}>
                <input
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={set('fullName')}
                  className={fieldCls(errors.fullName)}
                  placeholder="Ayesha Khan"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={set('email')}
                  className={fieldCls(errors.email)}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="Phone / WhatsApp" error={errors.phone} className="sm:col-span-2">
                <input
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={set('phone')}
                  className={fieldCls(errors.phone)}
                  placeholder="+92 300 0000000"
                />
              </Field>
            </div>
          </section>

          <section aria-labelledby="sec-address" className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-botanical" aria-hidden="true">02</span>
              <h2 id="sec-address" className="font-heading text-xl md:text-2xl text-deep-brown">
                Delivery address
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Address line" error={errors.addressLine1} className="sm:col-span-2">
                <input
                  type="text"
                  autoComplete="address-line1"
                  value={values.addressLine1}
                  onChange={set('addressLine1')}
                  className={fieldCls(errors.addressLine1)}
                  placeholder="House 12, Street 4, Area"
                />
              </Field>
              <Field label="Landmark (optional)" className="sm:col-span-2">
                <input
                  type="text"
                  autoComplete="address-line2"
                  value={values.addressLine2}
                  onChange={set('addressLine2')}
                  className={fieldCls(false)}
                  placeholder="Near …"
                />
              </Field>
              <Field label="City" error={errors.city}>
                <select value={values.city} onChange={set('city')} className={fieldCls(errors.city)}>
                  <option value="">Select city</option>
                  {pakistanCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Province" error={errors.province}>
                <input
                  type="text"
                  value={values.province}
                  onChange={set('province')}
                  className={fieldCls(errors.province)}
                  placeholder="Sindh, Punjab, KP, Balochistan, ICT…"
                />
              </Field>
              <Field label="Postal code (optional)">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={values.postalCode}
                  onChange={set('postalCode')}
                  className={fieldCls(false)}
                  placeholder="74000"
                />
              </Field>
              <Field label="Order notes (optional)" className="sm:col-span-2">
                <textarea
                  rows={3}
                  value={values.notes}
                  onChange={set('notes')}
                  className={`${fieldCls(false)} resize-y min-h-[80px]`}
                  placeholder="Delivery instructions…"
                />
              </Field>
            </div>
          </section>

          <section aria-labelledby="sec-payment" className="flex flex-col gap-5">
            <div className="flex items-baseline gap-3">
              <span className="font-heading text-2xl text-botanical" aria-hidden="true">03</span>
              <h2 id="sec-payment" className="font-heading text-xl md:text-2xl text-deep-brown">
                Payment method
              </h2>
            </div>

            <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <legend className="sr-only">Choose a payment method</legend>
              {paymentMethods.map((m) => {
                const active = values.paymentMethod === m.id
                return (
                  <label
                    key={m.id}
                    className={[
                      'relative flex items-start gap-3 border px-4 py-4 cursor-pointer transition-all',
                      active
                        ? 'border-rosewood bg-butter-soft/30 shadow-[0_1px_0_rgba(152,118,109,0.15)]'
                        : 'border-parchment bg-ivory hover:border-rosewood/40',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={active}
                      onChange={set('paymentMethod')}
                      className="sr-only"
                    />
                    <span
                      className={[
                        'mt-0.5 w-4 h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors',
                        active ? 'border-rosewood' : 'border-parchment',
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      {active && <span className="w-2 h-2 rounded-full bg-rosewood" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-body text-sm font-medium text-deep-brown">{m.label}</span>
                      <span className="block font-body text-xs text-deep-brown-soft mt-0.5">{m.hint}</span>
                    </span>
                    {active && (
                      <Check size={14} strokeWidth={2} className="absolute top-3 right-3 text-rosewood" aria-hidden="true" />
                    )}
                  </label>
                )
              })}
            </fieldset>

            <p className="font-body text-xs text-deep-brown-soft/80 leading-relaxed bg-cream border border-parchment/60 px-4 py-3">
              Card, JazzCash, and Easypaisa payments are processed through verified gateway
              integrations on the backend — never stored on this site. Cash on Delivery is
              available nationwide.
            </p>
          </section>
        </div>

        {/* Right — summary */}
        <aside className="lg:col-span-5 reveal lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]" style={{ '--reveal-delay': '100ms' }} aria-label="Order summary">
          <div className="bg-cream border border-parchment/70 px-6 py-7 flex flex-col gap-5">
            <p className="eyebrow">Order summary</p>

            <div className="flex gap-4">
              <div className="w-20 shrink-0 aspect-[3/4] bg-parchment-light overflow-hidden">
                <img
                  src={product.heroImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-lg text-deep-brown leading-tight">{product.name}</p>
                <p className="font-body text-xs uppercase tracking-[0.14em] text-deep-brown-soft mt-0.5">
                  {product.tagline} · {product.size}
                </p>
                <p className="font-body text-sm text-deep-brown-soft mt-1.5">
                  Qty {quantity} · {formatPrice(subtotal)}
                </p>
              </div>
            </div>

            <hr className="rule-botanical" />

            <dl className="flex flex-col gap-2.5 font-body text-sm">
              <div className="flex justify-between">
                <dt className="text-deep-brown-soft">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-deep-brown-soft">
                  Shipping <span className="text-deep-brown-soft/70">(est.)</span>
                </dt>
                <dd className="tabular-nums">
                  {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                </dd>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-parchment/60">
                <dt className="font-heading text-lg text-deep-brown">Total</dt>
                <dd className="font-heading text-xl text-deep-brown tabular-nums">
                  {formatPrice(totals.total)}
                </dd>
              </div>
            </dl>

            <p className="font-body text-xs text-deep-brown-soft leading-relaxed">
              Delivery {shipping.estimateDays.min}–{shipping.estimateDays.max} working days
              across Pakistan. Final shipping is confirmed by the backend at order creation.
            </p>

            {formError && (
              <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
                {formError}
              </p>
            )}

            <Button type="submit" size="lg" variant="solid" className="w-full" disabled={submitting}>
              {submitting ? 'Placing order…' : `Place Order · ${formatPrice(totals.total)}`}
            </Button>

            <p className="font-body text-[0.68rem] text-deep-brown-soft/80 text-center leading-relaxed">
              By placing this order you agree to our terms. You will receive a confirmation
              with your order reference.
            </p>
          </div>
        </aside>
      </form>
    </div>
  )
}
