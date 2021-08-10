import { ApolloServer } from 'apollo-server-express'
import * as express from 'express'
import { schema } from './schema'
import { createContext } from './utils'

const app = express()

const server = new ApolloServer({
  schema,
  // only enable debug in development
  debug: process.env.NODE_ENV === 'development',
  // only enable introspection for development
  introspection: process.env.NODE_ENV === 'development',
  context: createContext,
})

server.applyMiddleware({ app, path: '/' })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
)
