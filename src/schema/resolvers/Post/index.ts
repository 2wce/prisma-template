import { Context } from '../../../utils'

export default {
  Query: {
    feed: async(_parent: any, _args: any, ctx: Context) => {
      // @DEMO: RAW QUERY
      // const result = await ctx.prisma.$queryRaw('SELECT * FROM Post where published = true;')

      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    // @DEMO: FILTERING
    filterPosts: (_parent: any, args: { searchString: any }, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (_parent: any, args: { where: { id: any } }, ctx: Context) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (
      _parent: any,
      args: { title: any; content: any; authorEmail: any },
      ctx: Context,
    ) => {
      // @DEMO: TRANSACTION DEMO
      return ctx.prisma.post.create({
        data: {
          title: args.title,
          content: args.content,
          published: false,
          author: {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    deleteOnePost: (
      _parent: any,
      args: { where: { id: number } },
      ctx: Context,
    ) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    publish: (_parent: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
  },
  Post: {
    // @DEMO: RELATIONS DEMO
    author: (parent: { id: number }, _args: any, ctx: Context) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}
