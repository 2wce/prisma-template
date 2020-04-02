import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import * as typeDefs from './schema.graphql'

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
})
