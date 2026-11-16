import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  LogOut,
  Package,
  RefreshCw,
  ShoppingBag,
  Star,
  Lock,
} from 'lucide-react'
import { api } from '../lib/api'
import { formatPrice } from '../data/product'
import { Button } from '../components/common/Button'
import { useReveal } from '../hooks/useUi'

const ORDER_STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
const REVIEW_STATUSES = ['PENDING', 'PUBLISHED', 'HIDDEN']
const TABS = [
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
]

const inputCls =
  'bg-ivory border border-parchment px-3 py-2.5 font-body text-sm text-deep-brown placeholder:text-parchment focus:border-rosewood focus:outline-none transition-colors w-full'

function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-parchment/40 text-deep-brown-soft border-parchment',
    good: 'bg-botanical/15 text-botanical-deep border-botanical/40',
    warn: 'bg-butter/30 text-deep-brown border-butter',
    bad: 'bg-rosewood-soft/20 text-rosewood border-rosewood-soft/50',
  }
  return (
    <span
      className={`inline-block font-body text-[0.6rem] uppercase tracking-[0.12em] px-2 py-0.5 border ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

function statusTone(status) {
  if (['DELIVERED', 'PAID', 'PUBLISHED', 'CONFIRMED', 'SHIPPED'].includes(status)) return 'good'
  if (['CANCELLED', 'FAILED', 'HIDDEN'].includes(status)) return 'bad'
  if (['PENDING', 'COD_PENDING', 'PROCESSING'].includes(status)) return 'warn'
  return 'neutral'
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { admin } = await api.login({ email, password })
      onLogin(admin)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-ivory texture-parchment">
      <form
        onSubmit={submit}
        className="reveal w-full max-w-md bg-cream border border-parchment/70 px-8 py-10 flex flex-col gap-5"
      >
        <div className="flex items-center gap-3">
          <Lock size={18} strokeWidth={1.4} className="text-rosewood" aria-hidden="true" />
          <p className="eyebrow">Private access</p>
        </div>
        <h1 className="font-heading text-3xl text-deep-brown">Admin Dashboard</h1>
        <p className="font-body text-sm text-deep-brown-soft leading-relaxed">
          Sign in to manage orders, products, reviews, and analytics.
        </p>

        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
            Email
          </span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@zulfekhaas.pk"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[0.7rem] uppercase tracking-[0.14em] text-deep-brown-soft">
            Password
          </span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className={inputCls}
          />
        </label>

        {error && (
          <p
            className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5"
            role="alert"
          >
            {error}
          </p>
        )}

        <Button type="submit" variant="solid" size="md" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </Button>

        <Link
          to="/"
          className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors text-center"
        >
          ← Back to store
        </Link>
      </form>
    </div>
  )
}

function OrdersPanel() {
  // result tagged with query so loading is derived, not set inside the effect
  const [result, setResult] = useState({ query: null, orders: [], error: '', seen: false })
  const [filter, setFilter] = useState('')
  const [busyId, setBusyId] = useState('')
  const [newCount, setNewCount] = useState(0)
  const seenIdsRef = useRef(null)

  const query = filter

  const load = useCallback(async () => {
    try {
      const qs = filter ? `?status=${filter}` : ''
      const data = await api.get(`/admin/orders${qs}`)
      const fresh = []
      if (seenIdsRef.current) {
        for (const o of data.orders) {
          if (!seenIdsRef.current.has(o.id)) fresh.push(o.id)
        }
      }
      if (!seenIdsRef.current) seenIdsRef.current = new Set()
      for (const o of data.orders) seenIdsRef.current.add(o.id)
      if (fresh.length) setNewCount((c) => c + fresh.length)
      setResult({ query, orders: data.orders, error: '', seen: true })
    } catch (err) {
      setResult({ query, orders: [], error: err.message, seen: true })
    }
  }, [filter, query])

  useEffect(() => {
    let cancelled = false
    const qs = filter ? `?status=${filter}` : ''
    api
      .get(`/admin/orders${qs}`)
      .then((data) => {
        if (cancelled) return
        const fresh = []
        if (seenIdsRef.current) {
          for (const o of data.orders) {
            if (!seenIdsRef.current.has(o.id)) fresh.push(o.id)
          }
        }
        if (!seenIdsRef.current) seenIdsRef.current = new Set()
        for (const o of data.orders) seenIdsRef.current.add(o.id)
        if (fresh.length) setNewCount((c) => c + fresh.length)
        setResult({ query: filter, orders: data.orders, error: '', seen: true })
      })
      .catch((err) => {
        if (!cancelled) setResult({ query: filter, orders: [], error: err.message, seen: true })
      })
    return () => {
      cancelled = true
    }
  }, [filter])

  const loading = !result.seen || result.query !== query
  const orders = loading ? [] : result.orders
  const error = loading ? '' : result.error

  const updateStatus = async (id, status) => {
    setBusyId(id)
    try {
      await api.patch(`/admin/orders/${id}`, { status })
      setResult((r) => ({ ...r, orders: r.orders.map((o) => (o.id === id ? { ...o, status } : o)) }))
    } catch (err) {
      setResult((r) => ({ ...r, error: err.message }))
    } finally {
      setBusyId('')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter orders by status">
          <button
            type="button"
            onClick={() => setFilter('')}
            aria-pressed={filter === ''}
            className={`font-body text-[0.65rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
              filter === ''
                ? 'bg-deep-brown text-ivory border-deep-brown'
                : 'bg-cream text-deep-brown-soft border-parchment hover:border-rosewood'
            }`}
          >
            All
          </button>
          {ORDER_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              aria-pressed={filter === s}
              className={`font-body text-[0.65rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
                filter === s
                  ? 'bg-deep-brown text-ivory border-deep-brown'
                  : 'bg-cream text-deep-brown-soft border-parchment hover:border-rosewood'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {newCount > 0 && (
            <Badge tone="warn">{newCount} new since load</Badge>
          )}
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw size={13} className="inline mr-1.5" aria-hidden="true" />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="font-body text-sm text-deep-brown-soft">Loading orders…</p>}

      {!loading && orders.length === 0 && (
        <p className="font-body text-sm text-deep-brown-soft bg-cream border border-parchment/60 px-5 py-8 text-center">
          No orders match this filter.
        </p>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto border border-parchment/60">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-parchment-light/60">
                {['Reference', 'Customer', 'Total', 'Payment', 'Order status', 'Placed', 'Update'].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="font-body text-[0.62rem] uppercase tracking-[0.14em] text-deep-brown-soft px-4 py-3 border-b border-parchment/60"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="bg-ivory border-b border-parchment/40 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-deep-brown">{o.reference}</td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm text-deep-brown block">{o.customerName}</span>
                    <span className="font-body text-xs text-deep-brown-soft">{o.email}</span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-deep-brown whitespace-nowrap">
                    {formatPrice(o.totalPkr)}
                    <span className="block text-xs text-deep-brown-soft">
                      {o.items.reduce((n, i) => n + i.quantity, 0)} item
                      {o.items.reduce((n, i) => n + i.quantity, 0) === 1 ? '' : 's'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(o.paymentStatus)}>{o.paymentStatus}</Badge>
                    <span className="block font-body text-[0.6rem] uppercase tracking-[0.1em] text-deep-brown-soft mt-1">
                      {o.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={statusTone(o.status)}>{o.status}</Badge>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-deep-brown-soft whitespace-nowrap">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      disabled={busyId === o.id}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      aria-label={`Update status for ${o.reference}`}
                      className="bg-ivory border border-parchment px-2 py-1.5 font-body text-xs text-deep-brown focus:border-rosewood focus:outline-none disabled:opacity-60"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ProductsPanel() {
  const [result, setResult] = useState({ loaded: false, products: [], error: '' })
  const [editing, setEditing] = useState(null) // product id | 'new'
  const [form, setForm] = useState(null)
  const [busy, setBusy] = useState(false)

  const blank = {
    slug: '',
    name: '',
    tagline: '',
    description: '',
    sizeMl: 150,
    pricePkr: 0,
    stock: 0,
    inStock: true,
    benefits: [],
    heroImage: '',
    active: true,
  }

  const load = useCallback(async () => {
    try {
      const data = await api.get('/admin/products')
      setResult({ loaded: true, products: data.products, error: '' })
    } catch (err) {
      setResult((r) => ({ ...r, loaded: true, error: err.message }))
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    api
      .get('/admin/products')
      .then((data) => {
        if (!cancelled) setResult({ loaded: true, products: data.products, error: '' })
      })
      .catch((err) => {
        if (!cancelled) setResult((r) => ({ ...r, loaded: true, error: err.message }))
      })
    return () => {
      cancelled = true
    }
  }, [])

  const loading = !result.loaded
  const products = result.products
  const error = result.error

  const startEdit = (p) => {
    setEditing(p.id)
    setForm({
      ...p,
      benefits: p.benefits ?? [],
      heroImage: p.heroImage ?? '',
    })
  }

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    setResult((r) => ({ ...r, error: '' }))
    try {
      const payload = {
        ...form,
        sizeMl: Number(form.sizeMl),
        pricePkr: Number(form.pricePkr),
        stock: Number(form.stock),
        benefits: Array.isArray(form.benefits)
          ? form.benefits
          : String(form.benefits)
              .split('\n')
              .map((b) => b.trim())
              .filter(Boolean),
        heroImage: form.heroImage || '',
      }
      if (editing === 'new') {
        await api.post('/admin/products', payload)
      } else {
        await api.patch(`/admin/products/${editing}`, payload)
      }
      setEditing(null)
      setForm(null)
      await load()
    } catch (err) {
      setResult((r) => ({ ...r, error: err.message }))
    } finally {
      setBusy(false)
    }
  }

  const setField = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [k]: value }))
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-body text-sm text-deep-brown-soft">
          {products.length} product{products.length === 1 ? '' : 's'} · edit price, stock, and copy
        </p>
        <Button
          variant="solid"
          size="sm"
          onClick={() => {
            setEditing('new')
            setForm({ ...blank })
          }}
        >
          New product
        </Button>
      </div>

      {error && (
        <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="font-body text-sm text-deep-brown-soft">Loading products…</p>}

      {editing && form && (
        <form onSubmit={save} className="bg-cream border border-parchment/70 px-6 py-6 flex flex-col gap-4">
          <p className="eyebrow">{editing === 'new' ? 'New product' : 'Edit product'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Slug</span>
              <input required value={form.slug} onChange={setField('slug')} pattern="[a-z0-9-]+" className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Name</span>
              <input required value={form.name} onChange={setField('name')} className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Tagline</span>
              <input required value={form.tagline} onChange={setField('tagline')} className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Description</span>
              <textarea required rows={4} value={form.description} onChange={setField('description')} className={`${inputCls} resize-y`} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Price (PKR)</span>
              <input required type="number" min={1} value={form.pricePkr} onChange={setField('pricePkr')} className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Stock</span>
              <input required type="number" min={0} value={form.stock} onChange={setField('stock')} className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Size (ml)</span>
              <input required type="number" min={1} value={form.sizeMl} onChange={setField('sizeMl')} className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">Hero image URL</span>
              <input value={form.heroImage} onChange={setField('heroImage')} placeholder="optional" className={inputCls} />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="font-body text-[0.68rem] uppercase tracking-[0.14em] text-deep-brown-soft">
                Benefits (one per line)
              </span>
              <textarea
                rows={3}
                value={(form.benefits ?? []).join('\n')}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    benefits: e.target.value.split('\n'),
                  }))
                }
                className={`${inputCls} resize-y`}
              />
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <label className="flex items-center gap-2 font-body text-sm text-deep-brown">
              <input type="checkbox" checked={form.inStock} onChange={setField('inStock')} />
              In stock
            </label>
            <label className="flex items-center gap-2 font-body text-sm text-deep-brown">
              <input type="checkbox" checked={form.active} onChange={setField('active')} />
              Active (visible in store)
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="solid" size="sm" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setEditing(null)
                setForm(null)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {!loading && products.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <li key={p.id} className="bg-cream border border-parchment/60 px-5 py-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg text-deep-brown">{p.name}</p>
                  <p className="font-body text-xs text-deep-brown-soft">{p.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone={p.active ? 'good' : 'bad'}>{p.active ? 'Active' : 'Hidden'}</Badge>
                  <Badge tone={p.stock > 0 ? 'good' : 'warn'}>{p.stock} in stock</Badge>
                </div>
              </div>
              <p className="font-body text-sm text-deep-brown-soft">{p.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="font-heading text-xl text-deep-brown">{formatPrice(p.pricePkr)}</span>
                <Button variant="outline" size="sm" onClick={() => startEdit(p)}>
                  Edit
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function ReviewsPanel() {
  const [result, setResult] = useState({ query: null, reviews: [], error: '' })
  const [filter, setFilter] = useState('')
  const [busyId, setBusyId] = useState('')
  const [respondingId, setRespondingId] = useState('')
  const [responseText, setResponseText] = useState('')

  useEffect(() => {
    let cancelled = false
    const qs = filter ? `?status=${filter}` : ''
    api
      .get(`/admin/reviews${qs}`)
      .then((data) => {
        if (!cancelled) setResult({ query: filter, reviews: data.reviews, error: '' })
      })
      .catch((err) => {
        if (!cancelled) setResult({ query: filter, reviews: [], error: err.message })
      })
    return () => {
      cancelled = true
    }
  }, [filter])

  const loading = result.query !== filter
  const reviews = loading ? [] : result.reviews
  const error = loading ? '' : result.error

  const moderate = async (id, patch) => {
    setBusyId(id)
    try {
      await api.patch(`/admin/reviews/${id}`, patch)
      setResult((r) => ({
        ...r,
        reviews: r.reviews.map((r0) =>
          r0.id === id
            ? { ...r0, ...patch, sellerResponse: patch.sellerResponse ?? r0.sellerResponse }
            : r0,
        ),
      }))
      setRespondingId('')
      setResponseText('')
    } catch (err) {
      setResult((r) => ({ ...r, error: err.message }))
    } finally {
      setBusyId('')
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter reviews">
        {[{ id: '', label: 'All' }, ...REVIEW_STATUSES.map((s) => ({ id: s, label: s }))].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`font-body text-[0.65rem] uppercase tracking-[0.14em] px-3 py-1.5 border transition-colors ${
              filter === f.id
                ? 'bg-deep-brown text-ivory border-deep-brown'
                : 'bg-cream text-deep-brown-soft border-parchment hover:border-rosewood'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
          {error}
        </p>
      )}
      {loading && <p className="font-body text-sm text-deep-brown-soft">Loading reviews…</p>}

      {!loading && reviews.length === 0 && (
        <p className="font-body text-sm text-deep-brown-soft bg-cream border border-parchment/60 px-5 py-8 text-center">
          No reviews match this filter.
        </p>
      )}

      {!loading && reviews.length > 0 && (
        <ul className="flex flex-col gap-4">
          {reviews.map((r) => (
            <li key={r.id} className="bg-cream border border-parchment/60 px-5 py-5 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Badge tone={statusTone(r.status)}>{r.status}</Badge>
                  <span className="font-body text-sm text-deep-brown">
                    {r.authorName} · {r.rating}★
                  </span>
                </div>
                <span className="font-body text-xs text-deep-brown-soft">
                  Order {r.order?.reference ?? '—'} · {r.order?.email ?? ''}
                </span>
              </div>
              <p className="font-body text-sm text-deep-brown-soft leading-relaxed">{r.body}</p>
              {r.photoUrl && (
                <img src={r.photoUrl} alt="" className="w-32 aspect-square object-cover border border-parchment/60" />
              )}

              {r.sellerResponse && (
                <div className="bg-ivory border-l-2 border-botanical px-3 py-2">
                  <p className="font-body text-[0.6rem] uppercase tracking-[0.14em] text-botanical-deep mb-1">
                    Seller response
                  </p>
                  <p className="font-body text-sm text-deep-brown-soft">{r.sellerResponse}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2 border-t border-parchment/50">
                {REVIEW_STATUSES.filter((s) => s !== r.status).map((s) => (
                  <Button
                    key={s}
                    variant={s === 'PUBLISHED' ? 'solid' : 'outline'}
                    size="sm"
                    disabled={busyId === r.id}
                    onClick={() => moderate(r.id, { status: s })}
                  >
                    {s === 'PUBLISHED' ? 'Publish' : s === 'HIDDEN' ? 'Hide' : 'Unpublish'}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setRespondingId(respondingId === r.id ? '' : r.id)
                    setResponseText(r.sellerResponse ?? '')
                  }}
                >
                  {r.sellerResponse ? 'Edit response' : 'Respond'}
                </Button>
              </div>

              {respondingId === r.id && (
                <div className="flex flex-col gap-2">
                  <textarea
                    rows={2}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="A short, human reply from the brand…"
                    className={`${inputCls} resize-y`}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="solid"
                      size="sm"
                      disabled={busyId === r.id}
                      onClick={() => moderate(r.id, { sellerResponse: responseText.trim() })}
                    >
                      Save response
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setRespondingId('')}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function AnalyticsPanel() {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    api
      .get('/admin/analytics')
      .then((data) => {
        if (!cancelled) setStats(data.analytics)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) return <p className="font-body text-sm text-deep-brown-soft">Crunching numbers…</p>
  if (error)
    return (
      <p className="font-body text-sm text-rosewood bg-rosewood-soft/15 border border-rosewood-soft/40 px-4 py-2.5" role="alert">
        {error}
      </p>
    )
  if (!stats) return null

  const cards = [
    { label: 'Total orders', value: stats.totalOrders },
    { label: 'Revenue (ex-cancelled)', value: formatPrice(stats.revenuePkr) },
    { label: 'Active products', value: stats.activeProducts },
    {
      label: 'Published reviews',
      value: stats.reviewsByStatus.PUBLISHED ?? 0,
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-cream border border-parchment/60 px-5 py-6">
            <p className="font-body text-[0.65rem] uppercase tracking-[0.14em] text-deep-brown-soft">{c.label}</p>
            <p className="font-heading text-3xl text-deep-brown mt-2">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-cream border border-parchment/60 px-5 py-6">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.14em] text-deep-brown-soft mb-4">
          Orders by status
        </p>
        <ul className="flex flex-col gap-2">
          {ORDER_STATUSES.map((s) => {
            const n = stats.ordersByStatus[s] ?? 0
            const pct = stats.totalOrders ? Math.round((n / stats.totalOrders) * 100) : 0
            return (
              <li key={s} className="flex items-center gap-3">
                <span className="font-body text-xs text-deep-brown w-28 shrink-0">{s}</span>
                <div className="flex-1 h-3 bg-parchment/40 border border-parchment/60">
                  <div className="h-full bg-botanical" style={{ width: `${pct}%` }} />
                </div>
                <span className="font-body text-xs text-deep-brown-soft w-16 text-right">
                  {n} ({pct}%)
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="bg-cream border border-parchment/60 px-5 py-6">
        <p className="font-body text-[0.65rem] uppercase tracking-[0.14em] text-deep-brown-soft mb-3">
          Reviews by moderation state
        </p>
        <div className="flex flex-wrap gap-3">
          {REVIEW_STATUSES.map((s) => (
            <Badge key={s} tone={statusTone(s)}>
              {s}: {stats.reviewsByStatus[s] ?? 0}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

function Dashboard({ admin, onLogout }) {
  const ref = useReveal()
  const [tab, setTab] = useState('orders')

  return (
    <div ref={ref} className="bg-ivory texture-parchment min-h-screen pb-20">
      <header className="border-b border-parchment/60 bg-cream/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Zulfe Khaas · Admin</p>
            <p className="font-heading text-xl text-deep-brown mt-0.5">{admin.displayName}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-deep-brown-soft hidden sm:inline">{admin.email}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut size={13} className="inline mr-1.5" aria-hidden="true" />
              Sign out
            </Button>
            <Link
              to="/"
              className="font-body text-[0.68rem] uppercase tracking-[0.16em] text-deep-brown-soft hover:text-rosewood transition-colors"
            >
              Store →
            </Link>
          </div>
        </div>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto" aria-label="Admin sections">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-current={tab === id ? 'page' : undefined}
              className={`flex items-center gap-2 font-body text-[0.7rem] uppercase tracking-[0.14em] px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                tab === id
                  ? 'border-rosewood text-rosewood'
                  : 'border-transparent text-deep-brown-soft hover:text-deep-brown'
              }`}
            >
              <Icon size={14} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 reveal">
        {tab === 'orders' && <OrdersPanel />}
        {tab === 'products' && <ProductsPanel />}
        {tab === 'reviews' && <ReviewsPanel />}
        {tab === 'analytics' && <AnalyticsPanel />}
      </main>
    </div>
  )
}

export default function Admin() {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let cancelled = false
    api
      .me()
      .then((data) => {
        if (!cancelled) setAdmin(data.admin)
      })
      .catch(() => {
        /* not signed in */
      })
      .finally(() => {
        if (!cancelled) setChecking(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const logout = async () => {
    try {
      await api.logout()
    } catch {
      /* clear local state regardless */
    }
    setAdmin(null)
  }

  if (checking) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-ivory">
        <p className="font-body text-sm text-deep-brown-soft">Checking access…</p>
      </div>
    )
  }

  if (!admin) return <LoginForm onLogin={setAdmin} />
  return <Dashboard admin={admin} onLogout={logout} />
}
