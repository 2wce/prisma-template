import {
  clearData,
  Context,
  postFactory,
  prisma,
  userFactory,
} from '../../../../../utils'
import deletePost from '../deletePost'

let context: Context

beforeAll(async () => {
  await clearData()

  context = {
    prisma,
    //userId: 1,
  }

  //create posts dummy data
  const posts = postFactory.buildList(1)

  // create user dummy data
  const users = userFactory.buildList(1)

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

test('should delete existing post if id is valid', async () => {
  const id = 1
  const args = { id }

  const result = await deletePost({}, args, context)

  expect(result).toBeTruthy()
  expect(result.id).toBe(id)

  // confirm post is deleted in db
  const deletedItem = await prisma.post.findFirst({
    where: { id },
  })

  expect(deletedItem).toBeFalsy()
})
