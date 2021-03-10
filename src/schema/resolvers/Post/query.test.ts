import { getPrismaTestInstance } from '../../../utils'
import postResolvers from './index'

describe('Successful post queries', () => {
  it('can get filtered posts with valid search string', async () => {
    // setup
    const {
      Query: { filterPosts },
    } = postResolvers
    const args = { searchString: 'Subscribe to' }
    const context = {
      prisma: getPrismaTestInstance,
      request: {},
    }

    // test
    const posts = await filterPosts({}, args, context)

    // assert
    expect(posts).toMatchSnapshot()
  })

  it('can get feed with published posts', async () => {
    // setup
    const {
      Query: { feed },
    } = postResolvers
    const context = {
      prisma: getPrismaTestInstance,
      request: {},
    }

    // test
    const posts = await feed({}, {}, context)

    // assert
    expect(posts).toMatchSnapshot()
  })

  it('can get post with valid id', async () => {
    // setup
    const {
      Query: { post },
    } = postResolvers
    const context = {
      prisma: getPrismaTestInstance,
      request: {},
    }
    const args = { where: { id: 2 } }

    // test
    const result = await post({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })
})

afterAll(async (done) => {
  await getPrismaTestInstance.$disconnect()
  done()
})
