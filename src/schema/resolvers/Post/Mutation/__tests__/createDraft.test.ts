import { clearData, Context, prisma, userFactory } from '../../../../../utils'
import createDraft from '../createDraft'

let context: Context

beforeAll(async () => {
  await clearData()

  context = {
    prisma,
    userId: 1,
  }

  // create user dummy data
  const users = userFactory.build({ id: 1, email: 'user1@email.com' })

  const res = await prisma.$transaction([
    prisma.user.createMany({
      data: users,
    }),
  ])

  console.assert(res.length === 1)
  console.assert(res.every((item) => item.count === 1))
})

afterAll(async () => {
  await clearData()

  await prisma.$disconnect()
})

test('should create a draft post if input is valid', async () => {
  const args = { input: { title: 'title', content: 'content' } }

  const result = await createDraft({}, args, context)

  expect(result).toBeTruthy()
  expect(result.published).toBeFalsy()

  // confirm new post is in db
  const newPost = await prisma.post.findFirst({
    where: { id: result.id },
  })

  expect(newPost?.title).toBe(args.input.title)
  expect(newPost?.content).toBe(args.input.content)
  expect(newPost?.published).toBeFalsy()
  expect(newPost?.authorId).toBe(context.userId)
  expect(newPost?.id).toBe(result.id)
})
