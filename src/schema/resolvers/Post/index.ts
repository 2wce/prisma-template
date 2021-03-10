import { Context } from '../../../utils'

export default {
  Query: {
    feed: (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    filterPosts: (parent: any, args: { searchString: any }, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (parent: any, args: { where: { id: any } }, ctx: Context) => {
      return ctx.prisma.post.findUnique({
        where: { id: Number(args.where.id) },
      })
    },
  },
  Mutation: {
    createDraft: (
      parent: any,
      args: { title: any; content: any; authorEmail: any },
      ctx: {
        prisma: {
          post: {
            create: (arg0: {
              data: {
                title: any
                content: any
                published: boolean
                author: { connect: { email: any } }
              }
            }) => any
          }
        }
      },
    ) => {
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
      parent: any,
      args: { where: { id: number } },
      ctx: Context,
    ) => {
      return ctx.prisma.post.delete({
        where: { id: Number(args.where.id) },
      })
    },
    publish: (parent: any, args: { id: number }, ctx: Context) => {
      return ctx.prisma.post.update({
        where: { id: Number(args.id) },
        data: { published: true },
      })
    },
  },
  Post: {
    author: (parent: { id: number }, args: any, ctx: Context) => {
      return ctx.prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}
