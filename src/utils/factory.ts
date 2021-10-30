import { Prisma, PrismaClient } from '@prisma/client'
import * as Factory from 'factory.ts'
import { commerce, internet, name } from 'faker'

const prisma = new PrismaClient()

export interface TableList {
  TABLE_NAME: string
}

export const userFactory = Factory.Sync.makeFactory<Prisma.UserCreateManyInput>(
  {
    name: Factory.Sync.each(() => name.firstName()),
    surname: Factory.Sync.each(() => name.lastName()),
    email: Factory.Sync.each((seq) => `seq_${seq}_${internet.email()}`),
    password: Factory.Sync.each(() => internet.password()),
  },
)

export const postFactory = Factory.Sync.makeFactory<Prisma.PostCreateManyInput>(
  {
    title: Factory.Sync.each(() => commerce.productName()),
    content: Factory.Sync.each(() => commerce.productDescription()),
    published: true,
  },
)

export const clearData = async () => {
  try {
    const posts = await prisma.post.deleteMany()
    const users = await prisma.user.deleteMany()

    console.log({ posts, users })
  } catch (error) {
    console.error(error)
    return error
  }
}
