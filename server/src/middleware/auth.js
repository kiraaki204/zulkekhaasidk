import crypto from 'node:crypto'
import argon2 from 'argon2'
import { prisma } from '../lib/prisma.js'
import { config } from '../lib/config.js'
import { ApiError } from './errors.js'

const SESSION_TOKEN_BYTES = 32

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export async function createSession(adminId) {
  const token = crypto.randomBytes(SESSION_TOKEN_BYTES).toString('base64url')
  const expiresAt = new Date(Date.now() + config.session.ttlHours * 60 * 60 * 1000)
  await prisma.session.create({
    data: { tokenHash: hashToken(token), adminId, expiresAt },
  })
  return { token, expiresAt }
}

export async function destroySession(token) {
  if (!token) return
  await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } })
}

export function setSessionCookie(res, token, expiresAt) {
  res.cookie(config.session.cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.session.secure,
    path: '/',
    expires: expiresAt,
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(config.session.cookieName, { path: '/' })
}

export async function hashPassword(plain) {
  return argon2.hash(plain, { type: argon2.argon2id })
}

export async function verifyPassword(hash, plain) {
  try {
    return await argon2.verify(hash, plain)
  } catch {
    return false
  }
}

/** Require a valid admin session (server-side authorization). */
export async function requireAdmin(req, _res, next) {
  try {
    const token = req.cookies?.[config.session.cookieName]
    if (!token) throw new ApiError(401, 'Authentication required')

    const session = await prisma.session.findUnique({
      where: { tokenHash: hashToken(token) },
      include: { admin: true },
    })
    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
      throw new ApiError(401, 'Session expired')
    }

    req.admin = {
      id: session.admin.id,
      email: session.admin.email,
      displayName: session.admin.displayName,
      role: session.admin.role,
    }
    next()
  } catch (err) {
    next(err)
  }
}
