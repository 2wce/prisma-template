import { gql } from 'apollo-server';

export default gql`
  input CreateDraftInput {
    content: String
    title: String!
  }

  input SignupInput {
    email: String!
    name: String
  }

  input UpdatePostInput {
    id: ID!
    content: String
    title: String
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
    posts(searchTerm: String): [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    #auth
    signup(input: SignupInput!): User!
    login(email: String!): String
    resetPassword(input: ResetPasswordInput!): AuthPayload
    forgotPassword(input: ForgotPasswordInput!): Boolean

    createDraft(input: CreateDraftInput!): Post!
    updatePost(input: UpdatePostInput!): Post!
    deletePost(id: ID!): Post
    publish(id: ID!): Post
  }
`;
