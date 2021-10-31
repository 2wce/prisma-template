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
    signup: isUnauthenticatedUser,
    login: isUnauthenticatedUser,
    resetPassword: isUnauthenticatedUser,
    forgotPassword: isUnauthenticatedUser,

    createDraft: isAuthenticatedUser,
    deletePost: isPostOwner,
    publish: isPostOwner,
    updatePost: isPostOwner,
  },
})
