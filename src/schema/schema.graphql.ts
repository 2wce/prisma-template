import { gql } from 'apollo-server'

export default gql`
  input CreateDraftInput {
    email: String!
    content: String
    title: String!
  }

  input UserCreateInput {
    email: String!
    name: String
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
    createDraft(input: CreateDraftInput!): Post!
    deleteOnePost(id: Int!): Post
    publish(id: Int!): Post
    # @TODO: add createUser mutation
    #signup(input: UserCreateInput!): User!
  }
`
