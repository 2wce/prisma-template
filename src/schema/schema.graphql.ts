import { gql } from 'apollo-server'

export default gql`
  input CreateDraftInput {
    content: String
    title: String!
  }

  input ResetPasswordInput {
    password: String!
    passwordConfirmation: String!
    code: Int!
  }

  input ForgotPasswordInput {
    email: String
  }

  type AuthPayload {
    jwt: String
    user: User
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User
  }

  type User {
    id: ID!
    email: String!
    name: String
    posts: [Post!]!
  }

  type Query {
    me: User
    feed: [Post!]!
    filterPosts(searchTerm: String): [Post!]!
    post(id: Int!): Post
  }

  type Mutation {
    #auth
    login(email: String!): String
    resetPassword(input: ResetPasswordInput!): AuthPayload
    forgotPassword(input: ForgotPasswordInput!): Boolean

    createDraft(input: CreateDraftInput!): Post!
    deletePost(id: Int!): Post
    publish(id: Int!): Post
    # @TODO: add createUser mutation
    #signup(input: UserCreateInput!): User!
  }
`
