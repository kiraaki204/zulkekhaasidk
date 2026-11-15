import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

const PRODUCT = {
  slug: 'zulfe-khaas-hair-oil-150',
  name: 'Zulfe Khaas',
  tagline: 'Herbal Hair Oil',
  description:
    'A slow-crafted herbal hair oil enriched with 27 botanicals, simmered in a mustard-oil base. Made to nourish the scalp, strengthen the lengths, and bring a quiet ritual of care to every day.',
  sizeMl: 150,
  pricePkr: 2499,
  stock: 120,
  inStock: true,
  benefits: [
    'Nourishes the scalp with 27 hand-selected herbs',
    'Supports stronger, softer-looking lengths',
    'Lightweight mustard-oil base, never greasy-heavy',
    'A calming botanical ritual for daily or weekly care',
  ],
  heroImage: '/src/assets/images/Zulfe Khaas Hair Oil Still Life.png',
}

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: PRODUCT.slug },
    update: PRODUCT,
    create: PRODUCT,
  })
  console.log('[seed] product:', product.slug)

  const adminEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL ?? 'admin@zulfekhaas.pk').toLowerCase()
  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'change-me-before-production'
  const passwordHash = await argon2.hash(adminPassword, { type: argon2.argon2id })

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, displayName: 'Zulfe Khaas Admin', role: 'admin' },
  })
  console.log('[seed] admin:', admin.email)
  if (adminPassword === 'change-me-before-production') {
    console.warn('[seed] WARNING: using default admin password — set ADMIN_BOOTSTRAP_PASSWORD')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
