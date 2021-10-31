import { allow, shield } from 'graphql-shield'
import rules from './rules'

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    posts: allow,
    post: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    publish: rules.isPostOwner,
    updatePost: rules.isPostOwner,
  },
})
