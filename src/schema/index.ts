import 'graphql-import-node'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import * as typeDefs from './schema.graphql'
import { permissions } from '../permissions'
import { applyMiddleware } from 'graphql-middleware'

export const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions,
)
