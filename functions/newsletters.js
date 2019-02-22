import { ApolloServer } from 'apollo-server-lambda'
import schema from '../resources/graphql/executableSchemas/newsletter'

const server = new ApolloServer({ schema })

module.exports.query = server.createHandler()
