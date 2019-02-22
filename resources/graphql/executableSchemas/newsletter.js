import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'graphql-import'
import resolvers from '../resolvers/newsletter'

const typeDefs = importSchema('resources/graphql/schemas/newsletter.graphql')

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})
