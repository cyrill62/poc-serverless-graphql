import {
  makeRemoteExecutableSchema,
  mergeSchemas,
  introspectSchema,
} from 'graphql-tools'
import { ApolloServer } from 'apollo-server-lambda'
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { graphql } from 'graphql'

const graphqlApis = [
  { uri: process.env.BASE_HOSTNAME + '/recipients' },
  { uri: process.env.BASE_HOSTNAME + '/newsletters' }
];

const createRemoteExecutableSchemas = async () => {
  let schemas = [];
  // iterate over all the the GraphQL APIs
  for (let i = 0; i < graphqlApis.length; i++) {
    // Create Apollo link with URI and headers of the GraphQL API
    const link = new HttpLink({
      uri: graphqlApis[i].uri,
      fetch
    });
    // Introspect schema
    const remoteSchema = await introspectSchema(link);
    // Make remote executable schema
    const remoteExecutableSchema = makeRemoteExecutableSchema({
      schema: remoteSchema,
      link
    });
    schemas.push(remoteExecutableSchema);
  }
  return schemas;
};

const createNewSchema = async () => {
  const schemas = await createRemoteExecutableSchemas();
  return mergeSchemas({
    schemas
  });
};

var maybeJson = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str
  }
}

module.exports.query = async (event, context) => {
  try {
    var payload = maybeJson(event.body)
    const schema = await createNewSchema()

    const result = await graphql(schema, payload['query'])

    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: err.message // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}

