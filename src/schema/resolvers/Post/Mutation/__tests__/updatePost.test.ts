import { clearData, Context, prisma, userFactory } from '../../../../../utils'
import updatePost from '../updatePost'
import createDraft from '../createDraft'

let context: Context

beforeAll(async () => {
  await clearData()

  context = {
    prisma,
    userId: 2,
  }

  // create user dummy data
  const users = userFactory.build({ id: 2, email: 'user2@email.com' })

  const res = await prisma.$transaction([
    prisma.user.createMany({ data: users }),
  ])
  console.assert(res.length === 1)
  // console.assert(res.every((item) => item.count === 1))
})

afterAll(async () => {
  await clearData()

  await prisma.$disconnect()
})

test('should update existing post if id is valid', async () => {
  const draftArgs = { input: { title: 'title', content: 'content' } }

  const draftResult = await createDraft({}, draftArgs, context)

  // get created post and update post
  const args = {
    input: { id: draftResult.id, title: 'Hello', content: 'howdy' },
  }
  const result = await updatePost({}, args, context)

  expect(result).toBeTruthy()

  //confirm post has been updated in db
  const updatedPost = await prisma.post.findFirst({
    where: { id: result.id },
  })

  expect(updatedPost?.title).toBe(args.input.title)
  expect(updatedPost?.content).toBe(args.input.content)
  expect(updatedPost?.id).toBe(args.input.id)
})
