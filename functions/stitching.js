import {
  mergeSchemas,
  makeExecutableSchema,
} from 'graphql-tools'
import { importSchema } from 'graphql-import'
import { ApolloServer } from 'apollo-server-lambda'
import newsletterSchema from '../resources/graphql/executableSchemas/newsletter'
import recipientSchema from '../resources/graphql/executableSchemas/recipient'

const schemas = [
  newsletterSchema,
  recipientSchema
]

const schema = mergeSchemas({ schemas })
const server = new ApolloServer({ schema: schema })

module.exports.query = server.createHandler()
