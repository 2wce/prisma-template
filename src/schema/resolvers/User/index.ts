import { User } from '@prisma/client'
import { Context, getUserId } from '../../../utils'

export default {
  Query: {
    me: (_parent: unknown, _args: unknown, ctx: Context) => {
      const userId = getUserId(ctx)
      return ctx.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })
    },
  },
  User: {
    posts: (parent: User, _args: unknown, ctx: Context) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
}
