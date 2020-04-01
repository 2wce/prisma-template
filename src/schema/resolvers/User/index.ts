import { Context } from '../../../context'

export default {
  Query: {
    me: (parent, args, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
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
