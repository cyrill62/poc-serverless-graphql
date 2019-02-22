import dynamoose from 'dynamoose'

dynamoose.AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET'
})

dynamoose.local()
dynamoose.setDefaults({ create: false, waitForActive: false })

export default dynamoose.model('NewsletterSubscriptions', {
  email: String,
  firstName: String,
  lastName: String,
  unsubscribeToken: String,
  createdAt: Date,
  updatedAt: Date,
  subscribedAt: Date,
  unsubscribedAt: Date
})
