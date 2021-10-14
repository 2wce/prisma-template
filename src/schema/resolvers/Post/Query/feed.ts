import { Context } from '../../../../utils'

export default (_parent: unknown, _args: unknown, ctx: Context) => {
  return ctx.prisma.post.findMany({
    where: { published: true },
  })
}
