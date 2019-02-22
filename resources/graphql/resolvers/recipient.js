import GraphQLDateTime from 'graphql-type-datetime'
import Recipient from '../../dynamoose/models/recipient'
import uuidv4 from 'uuid/v4'

export default {
  DateTime: GraphQLDateTime,
  Mutation: {
    subscribe (_, { firstName, lastName, email }) {
      const newRecipient = new Recipient({
        firstName: firstName,
        lastName: lastName,
        email: email,
        unsubscribeToken: uuidv4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        subscribedAt: Date.now(),
        unsubscribedAt: null
      })

      return newRecipient
        .save()
        .then((user) => { return user })
        .catch((err) => { return err })
    },
    unsubscribe (_, { email, unsubscribeToken }) {
      // Lookup in DynamoDB
      return Recipient
        .update({ email: email, unsubscribeToken: unsubscribeToken }, { unsubscribedAt: Date.now() })
        .then((user) => { return user })
        .catch((err) => { return err })
    }
  },
  Query: {
    recipient (_, { email }) {
      return Recipient
        .get({ email: email })
        .then((user) => { return user })
        .catch((err) => { return err })
    },
    recipients () {
      return Recipient
        .scan()
        .all()
        .exec()
        .then((recipients) => { return recipients })
        .catch((err) => { return err })
    }
  }
}
