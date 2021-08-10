import { gql } from 'apollo-server'

export default gql`
  type User {
    email: String!
    id: ID!
    name: String
    posts: [Post!]!
  }

  type Post {
    author: User
    content: String
    id: ID!
    published: Boolean!
    title: String!
  }

  type Query {
    me: User
    feed: [Post!]!
    filterPosts(searchString: String): [Post!]!
    post(where: PostWhereUniqueInput!): Post
  }

  type Mutation {
    createDraft(authorEmail: String, content: String, title: String!): Post!
    deleteOnePost(where: PostWhereUniqueInput!): Post
    publish(id: ID): Post
    signupUser(data: UserCreateInput!): User!
  }

  input PostWhereUniqueInput {
    id: ID
  }

  input UserCreateInput {
    email: String!
    id: ID
    name: String
    posts: PostCreateManyWithoutPostsInput
  }

  input PostCreateManyWithoutPostsInput {
    connect: [PostWhereUniqueInput!]
    create: [PostCreateWithoutAuthorInput!]
  }

  input PostCreateWithoutAuthorInput {
    content: String
    id: ID
    published: Boolean
    title: String!
  }
`
