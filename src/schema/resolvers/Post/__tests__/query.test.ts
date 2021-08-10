import { Context, createMockContext, MockContext } from '../../../../utils'
import postResolvers from '../index'

let mockCtx: MockContext
let context: Context

beforeEach(() => {
  mockCtx = createMockContext()
  context = mockCtx as unknown as Context
})

describe('Successful post queries', () => {
  it('can get filtered posts with valid search string', async () => {
    // setup
    const {
      Query: { filterPosts },
    } = postResolvers
    const args = { searchString: 'Subscribe to' }

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

    const args = { where: { id: 2 } }

    // test
    const result = await post({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })
})
