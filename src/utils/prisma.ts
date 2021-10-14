import { PrismaClient } from '@prisma/client'
import { mockDeep, MockProxy } from 'jest-mock-extended'
import { getUserId } from './jwt'

const prisma = new PrismaClient()

export interface ContextEvent {
  headers: {
    authorization: string
    Authorization: string
  }
}
export interface Context {
  prisma: PrismaClient
  request?: ContextEvent
}

export type MockContext = {
  prisma: MockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}

// add prisma to context for resolvers
export function createContext(request: Context) {
  const userId = getUserId(request)
  return {
    ...request,
    userId,
    prisma,
  }
}
