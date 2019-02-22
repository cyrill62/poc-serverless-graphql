import GraphQLDateTime from 'graphql-type-datetime'
import Newsletter from '../../dynamoose/models/newsletter'
import uuidv4 from 'uuid/v4'

export default {
  DateTime: GraphQLDateTime,
  Mutation: {
    createNewsletter (_, { object, content }) {
      const newNewsletter = new Newsletter({
        uuid: uuidv4(),
        object: object,
        content: content,
        fromEmail: 'cyril+nl@lepagnot.fr',
        replyToEmail: 'cyril+nl@lepagnot.fr',
        sendAt: null,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })

      return newNewsletter
        .save()
        .then((newsletter) => { return newsletter })
        .catch((err) => { return err })
    }
  },
  Query: {
    newsletter (_, { uuid }) {
      return Newsletter
        .get({ uuid: uuid })
        .then((user) => { return user })
        .catch((err) => { return err })
    },
    newsletters () {
      return Newsletter
        .scan()
        .all()
        .exec()
        .then((newsletters) => { return newsletters })
        .catch((err) => { return err })
    }
  }
}
