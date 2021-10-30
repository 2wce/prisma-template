import { Context, createMockContext, MockContext } from '../../../../../utils'
import post from '../post'
import posts from '../posts'

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
    const filteredPosts = await posts({}, args, context)

    // assert
    expect(filteredPosts).toMatchSnapshot()
  })

  it('can get feed with published posts', async () => {
    // test
    const publishedPosts = await posts({}, {}, context)

    // assert
    expect(publishedPosts).toMatchSnapshot()
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
