import { Post } from '@prisma/client'
import {
  MutationCreateDraftArgs,
  MutationDeleteOnePostArgs,
  MutationPublishArgs,
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
      args: { searchString: string },
      ctx: Context,
    ) => {
      return ctx.prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: args.searchString } },
            { content: { contains: args.searchString } },
          ],
        },
      })
    },
    post: (
      _parent: unknown,
      { where: { id } }: QueryPostArgs,
      { prisma }: Context,
    ) => {
      return prisma.post.findUnique({
        where: { id },
      })
    },
  },
  Mutation: {
    createDraft: (
      _parent: unknown,
      args: MutationCreateDraftArgs,
      { prisma }: Context,
    ) => {
      return prisma.post.create({
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
      _parent: unknown,
      { where: { id } }: MutationDeleteOnePostArgs,
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
