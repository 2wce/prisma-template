## Example Flow

In order for the API to identify the user you are logging in as, you must provide a valid **email**. You can get this from the User table by using **npx prisma studio**.

##### Login as an existing user

```graphql
query {
  login(email: "example@user.com")
}
```

The response will be an auth token that you can add as a header to your requests.

You can use the following requests to test the post functionality.

##### Create a draft post

```graphql
mutation {
  createDraft(input: { content: CONTENT, title: TITLE }) {
    id
    createdAt
    updatedAt
    published
    title
    content
    author {
      id
      name
      email
    }
  }
}
```

##### Delete post

```graphql
mutation {
  deletePost(id: POST_ID_FROM_DB) {
    id
    createdAt
    updatedAt
  }
}
```

##### Update post

```graphql
mutation {
  updatePost(input: { id: POST_ID_FROM_DB, title: TITLE, content: CONTENT }) {
    id
    createdAt
    updatedAt
    published
    title
    content
  }
}
```

##### Publish post

```graphql
mutation {
  publish(id: POST_ID_FROM_DB) {
    id
    published
  }
}
```
