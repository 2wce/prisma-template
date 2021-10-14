import { gql } from 'apollo-server'

export default gql`
  input CreateDraftInput {
    email: String!
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
    login(email: String!): String
    me: User
    feed: [Post!]!
    filterPosts(searchTerm: String): [Post!]!
    post(id: Int!): Post
  }

  type Mutation {
    #auth
    resetPassword(input: ResetPasswordInput!): AuthPayload
    forgotPassword(input: ForgotPasswordInput!): Boolean

    createDraft(input: CreateDraftInput!): Post!
    deleteOnePost(id: Int!): Post
    publish(id: Int!): Post
    # @TODO: add createUser mutation
    #signup(input: UserCreateInput!): User!
  }
`
