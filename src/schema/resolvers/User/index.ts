import { Context, getUserId } from '../../../utils'

export default {
  Query: {
    me: (_parent: any, _args: any, ctx: Context) => {
      const userId = getUserId(ctx)
      return ctx.prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      })
    },
  },
  Mutation: {
    signupUser: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.create(args)
    },
  },
  User: {
    posts: (parent: { id: number }, _args: any, ctx: Context) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
}
