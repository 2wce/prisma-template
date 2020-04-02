import { Context, getUserId } from '../../../utils'

export default {
  Query: {
    me: (parent, args, ctx: Context) => {
      const userId = getUserId(ctx)
      return ctx.prisma.user.findOne({
        where: {
          id: Number(userId),
        },
      })
    },
  },
  Mutation: {
    signupUser: (parent, args, ctx: Context) => {
      return ctx.prisma.user.create(args)
    },
  },
  User: {
    posts: (parent, args, ctx: Context) => {
      return ctx.prisma.user
        .findOne({
          where: { id: parent.id },
        })
        .posts()
    },
  },
}
