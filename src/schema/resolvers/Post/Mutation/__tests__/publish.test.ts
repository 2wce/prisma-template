import {
  clearData,
  Context,
  postFactory,
  prisma,
  userFactory,
} from '../../../../../utils'
import publish from '../publish'

let context: Context

beforeAll(async () => {
  await clearData()

  context = {
    prisma,
    //userId: 1,
  }

  //create posts dummy data
  const posts = postFactory.build({ id: 3 })

  // create user dummy data
  const users = userFactory.build({ id: 3, email: 'user3@email.com' })

  const res = await prisma.$transaction([
    prisma.post.createMany({
      data: posts,
    }),
    prisma.user.createMany({
      data: users,
    }),
  ])

  console.assert(res.length === 2)
  console.assert(res.every((item) => item.count === 1))
})

afterAll(async () => {
  await clearData()

  await prisma.$disconnect()
})

test('should publish existing post if id is valid', async () => {
  const id = 3
  const args = { id }

  const result = await publish({}, args, context)

  expect(result).toBeTruthy()
  expect(result.id).toBe(id)

  // confirm post is updated in db
  const updated = await prisma.post.findFirst({
    where: { id },
  })

  expect(updated?.published).toBeTruthy()
  expect(updated?.id).toBe(id)
})
