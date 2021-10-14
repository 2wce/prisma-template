import { MutationCreateDraftArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default (
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
}
