import { ObjectId } from 'bson'
import { BotConfig } from './BotConfig'
import { ReadableCarbonConfig } from './ReadableCarbonConfig'

export type User = {
  _id: ObjectId
  telegramId: number
  config: {
    bot: Partial<BotConfig>
    carbon: Partial<ReadableCarbonConfig>
  }
}
