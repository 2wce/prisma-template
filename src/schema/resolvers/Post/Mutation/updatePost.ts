import { ApolloError } from 'apollo-server'
import { MutationUpdatePostArgs } from '../../../../generated'
import { Context, formatError } from '../../../../utils'

export default async (
  _parent: unknown,
  { input }: MutationUpdatePostArgs,
  { prisma, userId }: Context,
) => {
  try {
    const { title, content, id } = input

    if (!id || !userId) {
      throw new ApolloError('Invalid input')
    }

    // check if post linked to this user exists
    const postExists = await prisma.post.findFirst({
      where: {
        AND: [{ id }, { author: { id: userId } }],
      },
    })

    if (!postExists) {
      throw new ApolloError('Cannot update post')
    }

    return prisma.post.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    })
  } catch (error) {
    formatError('updatePost', error)
    return error
  }
}
