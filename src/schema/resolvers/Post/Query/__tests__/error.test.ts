import { Context, createMockContext, MockContext } from '../../../../../utils'
import feed from '../feed'
import filterPosts from '../filterPosts'
import post from '../post'

let mockCtx: MockContext
let context: Context

beforeEach(() => {
  mockCtx = createMockContext()
  context = mockCtx as unknown as Context
})

describe('Successful post queries', () => {
  it('can get filtered posts with valid search string', async () => {
    // setup
    const args = { searchTerm: 'Subscribe to' }

    // test
    const posts = await filterPosts({}, args, context)

    // assert
    expect(posts).toMatchSnapshot()
  })

  it('can get feed with published posts', async () => {
    // test
    const posts = await feed({}, {}, context)

    // assert
    expect(posts).toMatchSnapshot()
  })

  it('can get post with valid id', async () => {
    // setup
    const args = { id: 2 }

    // test
    const result = await post({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })
})
