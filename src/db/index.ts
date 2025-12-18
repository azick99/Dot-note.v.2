import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  })
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    })
  }
  prisma = global.cachedPrisma
}

export const db = prisma
