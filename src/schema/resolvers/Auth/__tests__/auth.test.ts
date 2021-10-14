import { Context, createMockContext, MockContext } from '../../../../utils'
import resolvers from '../index'

let mockCtx: MockContext
let context: Context

beforeEach(() => {
  mockCtx = createMockContext()
  context = mockCtx as unknown as Context
})

describe('Auth - Login', () => {
  it('returns an error if invalid input is parsed', async () => {
    // setup
    const {
      Mutation: { login },
    } = resolvers

    const args = { email: '' }

    // test
    const result = await login({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })

  it('returns an error if only email is parsed', async () => {
    // setup
    const {
      Mutation: { login },
    } = resolvers

    const args = { email: 't@g.com' }

    // test
    const result = await login({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })

  it('returns an error if email has invalid email format', async () => {
    // setup
    const {
      Mutation: { login },
    } = resolvers

    const args = { email: 't' }

    // test
    const result = await login({}, args, context)

    // assert
    expect(result).toMatchSnapshot()
  })
})
