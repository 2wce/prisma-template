import {
  clearData,
  Context,
  postFactory,
  prisma,
  userFactory,
} from '../../../../../utils'
import deletePost from '../deletePost'

let context: Context

beforeEach(async () => {
  await clearData()

  context = {
    prisma,
    //userId: 1,
  }

  //create posts dummy data
  const posts = postFactory.build({ id: 2 })

  // create user dummy data
  const users = userFactory.build({ id: 2, email: 'user2@email.com' })

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

afterEach(async () => {
  await clearData()

  await prisma.$disconnect()
})

test('should delete existing post if id is valid', async () => {
  const id = 2
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
