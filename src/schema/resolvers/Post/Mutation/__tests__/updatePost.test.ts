import {clearData, Context, postFactory, prisma, userFactory} from '../../../../../utils'
import updatePost from "../updatePost";


let context: Context

beforeAll(async () => {
    await clearData()

    context = {
        prisma,
        // userId: 2
    }

    // create post dummy data
    const posts = postFactory.build({id: 6})
    // create user dummy data
    const users = userFactory.build({id: 4, email: 'user4@email.com'})

    const res = await prisma.$transaction([
        prisma.post.createMany({data: posts}),
        prisma.user.createMany({data: users})
    ])
    console.assert(res.length === 2)
    console.assert(res.every((item) => item.count === 1))
})


afterAll(async () => {
    await clearData()

    await prisma.$disconnect()
})


test('should update existing post if id is valid', async () => {
    const id = 4
    const args = {input: {id, title: 'Hello', content: 'howdy'}}

    const result = await updatePost({}, args, context)


    expect(result).toBeTruthy()

    //confirm post has been updated in db

    const updatedPost = await prisma.post.findFirst({
        where: {id: result.id},
    })

    expect(updatedPost?.title).toBe(args.input.title)
    expect(updatedPost?.content).toBe(args.input.content)
    expect(updatedPost?.id).toBe(args.input.id)
})