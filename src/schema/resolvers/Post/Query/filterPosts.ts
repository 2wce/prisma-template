import { QueryFilterPostsArgs } from '../../../../generated'
import { Context } from '../../../../utils'

export default (_parent: unknown, args: QueryFilterPostsArgs, ctx: Context) => {
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
}
