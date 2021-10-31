import { shield } from 'graphql-shield'
import rules from './rules'

const { isAuthenticatedUser, isPostOwner, isUnauthenticatedUser } = rules

export const permissions = shield({
  Query: {
    me: isAuthenticatedUser,
    posts: isUnauthenticatedUser,
    post: isAuthenticatedUser,
  },
  Mutation: {
    createDraft: isAuthenticatedUser,
    deletePost: isPostOwner,
    publish: isPostOwner,
    updatePost: isPostOwner,
  },
})
