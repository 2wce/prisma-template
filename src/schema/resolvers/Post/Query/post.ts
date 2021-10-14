import { QueryPostArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default (
  _parent: unknown,
  { id }: QueryPostArgs,
  { prisma }: Context,
) => {
  return prisma.post.findUnique({
    where: { id },
  })
}
