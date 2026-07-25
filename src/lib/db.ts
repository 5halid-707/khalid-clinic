import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Validate DATABASE_URL on startup
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('[db] FATAL: DATABASE_URL is not set!')
  console.error('[db] For Neon PostgreSQL: https://neon.tech → create project → copy connection string')
  console.error('[db] Format: postgresql://user:pass@host/db?sslmode=require')
} else if (!databaseUrl.startsWith('postgres')) {
  console.error('[db] FATAL: DATABASE_URL must start with postgresql:// or postgres://')
  console.error('[db] Current value starts with:', databaseUrl.substring(0, 30))
  console.error('[db] For PostgreSQL on Neon: https://neon.tech')
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
