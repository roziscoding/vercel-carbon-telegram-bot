import { Collection, Db, ObjectId } from 'mongodb'
import { User } from '../domain/User'

export class UserRepository {
  public collection: Collection<User>
  constructor(db: Db) {
    this.collection = db.collection('users')
  }

  async findById(id: string) {
    if (!id || !ObjectId.isValid(id)) return null
    return this.collection.findOne(new ObjectId(id))
  }

  async findByTelegramId(telegramId: number) {
    return this.collection.findOne({ telegramId })
  }

  async setConfig(telegramId: number, type: 'bot' | 'carbon', key: string, value: string | boolean) {
    await this.collection.updateOne({ telegramId }, { $set: { [`config.${type}.${key}`]: value } })
  }

  async getConfig(telegramId: number, type: 'bot' | 'carbon', key: string) {
    return this.collection.findOne({ telegramId }, { [`config.${type}.${key}`]: 1 })
  }

  getCarbonConfig(telegramId: number) {
    return this.collection.findOne({ telegramId }).then((user) => user?.config.carbon || {})
  }

  async createDefaultUser(telegramId: number) {
    const user: User = {
      _id: new ObjectId(),
      telegramId,
      config: {
        carbon: {},
        bot: {}
      }
    }

    await this.collection.insertOne(user)

    return user
  }
}
