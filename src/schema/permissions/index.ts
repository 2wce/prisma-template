import { allow, rule, shield } from 'graphql-shield'
import { Context, getUserId } from '../../utils'

const rules = {
  isAuthenticatedUser: rule()(
    (_parent: unknown, _args: unknown, context: Context) => {
      const userId = getUserId(context)
      return Boolean(userId)
    },
  ),
  isPostOwner: rule()(
    async (_parent: unknown, { id }: { id: number }, context) => {
      const userId = getUserId(context)
      const author = await context.prisma.post
        .findOne({
          where: {
            id: Number(id),
          },
        })
        .author()
      return userId === author.id
    },
  ),
}

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    filterPosts: allow,
    feed: allow,
    post: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
    updatePost: rules.isPostOwner,
  },
})
