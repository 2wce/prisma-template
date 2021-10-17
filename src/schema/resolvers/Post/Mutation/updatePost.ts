import { ApolloError } from 'apollo-server'
import { MutationUpdatePostArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default async (
  _parent: unknown,
  { input }: MutationUpdatePostArgs,
  { prisma, userId }: Context,
) => {
  const { title, content, id } = input

  // check if post linked to this user exists
  const postExists = await prisma.post.findFirst({
    where: {
      AND: [{ id }, { authorId: userId }],
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
}
