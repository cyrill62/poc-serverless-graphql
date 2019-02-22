import dynamoose from 'dynamoose'

dynamoose.AWS.config.update({
  region: 'eu-west-1',
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET'
})

dynamoose.local()
dynamoose.setDefaults({ create: false, waitForActive: false })

export default dynamoose.model('Newsletters', {
  uuid: String,
  object: String,
  content: String,
  fromEmail: String,
  replyToEmail: String,
  sendAt: Date,
  createdAt: Date,
  updatedAt: Date
})
