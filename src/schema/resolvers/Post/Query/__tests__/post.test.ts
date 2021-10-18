import {
  clearData,
  Context,
  postFactory,
  prisma,
  userFactory,
} from '../../../../../utils'
import post from '../post'

let context: Context

beforeAll(async () => {
  await clearData()

  context = {
    prisma,
  }

  //create posts dummy data
  const posts = postFactory.build({ id: 30 })

  // create user dummy data
  const users = userFactory.build({ id: 30 })

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

test('should return existing post if id is valid', async () => {
  const id = 30
  const args = { id }

  const result = await post({}, args, context)

  expect(result).toBeTruthy()
  expect(result?.id).toBe(id)
})

test('should return error if post does not exist', async () => {
  const id = 3000
  const args = { id }

  const result = await post({}, args, context)

  expect(result).toBeFalsy()
})
