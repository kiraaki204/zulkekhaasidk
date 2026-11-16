const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

async function request(path, { method = 'GET', body, signal } = {}) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
      signal,
    })
  } catch (err) {
    const error = new Error('Could not reach the server. Check your connection and try again.')
    error.cause = err
    error.network = true
    throw error
  }

  const text = await res.text()
  const data = text ? JSON.parse(text) : null

  if (!res.ok) {
    const error = new Error(data?.error?.message ?? `Request failed (${res.status})`)
    error.status = res.status
    error.details = data?.error?.details
    throw error
  }

  return data
}

export const api = {
  base: API_BASE,
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: 'POST', body }),
  patch: (path, body, opts) => request(path, { ...opts, method: 'PATCH', body }),
  login: (body) => request('/auth/login', { method: 'POST', body }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
}

export default api
