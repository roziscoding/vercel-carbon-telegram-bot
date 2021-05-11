import { MongoClient } from 'mongodb'

export async function getDb (uri: string) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return client.connect()
    .then(connection => connection.db('carbon_bot'))
}
