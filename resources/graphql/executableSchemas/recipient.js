import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import resolvers from '../resolvers/recipient'

const typeDefs = importSchema('resources/graphql/schemas/recipient.graphql')

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
