import { User } from '@prisma/client'
import { Context } from '../../../utils'
import Query from './Query'

export default {
  Query,
  User: {
    posts: (parent: User, _args: unknown, ctx: Context) => {
      return ctx.prisma.user
        .findUnique({
          where: { id: parent.id },
        })
        .posts()
    },
  },
}
