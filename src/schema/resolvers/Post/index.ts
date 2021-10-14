import { Post } from '@prisma/client'
import {
  MutationCreateDraftArgs,
  MutationDeleteOnePostArgs,
  MutationPublishArgs,
  QueryFilterPostsArgs,
  QueryPostArgs,
} from '../../../generated'
import { Context } from '../../../utils'

export default {
  Query: {
    feed: (_parent: unknown, _args: unknown, ctx: Context) => {
      return ctx.prisma.post.findMany({
        where: { published: true },
      })
    },
    filterPosts: (
      _parent: unknown,
      args: QueryFilterPostsArgs,
      ctx: Context,
    ) => {
      const where = args.searchTerm
        ? {
            OR: [
              { title: { contains: args.searchTerm } },
              { content: { contains: args.searchTerm } },
            ],
          }
        : {}

      return ctx.prisma.post.findMany({
        where,
      })
    },
    post: (_parent: unknown, { id }: QueryPostArgs, { prisma }: Context) => {
      return prisma.post.findUnique({
        where: { id },
      })
    },
  },
  Mutation: {
    createDraft: (
      _parent: unknown,
      { input }: MutationCreateDraftArgs,
      { prisma }: Context,
    ) => {
      const { title, content, email } = input

      return prisma.post.create({
        data: {
          title,
          content,
          published: false,
          author: {
            connect: { email },
          },
        },
      })
    },
    deleteOnePost: (
      _parent: unknown,
      { id }: MutationDeleteOnePostArgs,
      { prisma }: Context,
    ) => {
      return prisma.post.delete({
        where: { id },
      })
    },
    publish: (_parent: unknown, { id }: MutationPublishArgs, ctx: Context) => {
      return ctx.prisma.post.update({
        where: { id },
        data: { published: true },
      })
    },
  },
  Post: {
    author: (parent: Post, _args: unknown, { prisma }: Context) => {
      return prisma.post
        .findUnique({
          where: { id: parent.id },
        })
        .author()
    },
  },
}
