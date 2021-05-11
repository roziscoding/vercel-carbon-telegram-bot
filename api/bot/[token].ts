import { VercelRequest, VercelResponse } from '@vercel/node'
import { getBot } from '../../src/bot'
import { config } from '../../src/config'
import { getDb } from '../../src/data/connection'
import { UserRepository } from '../../src/data/UserRepository'

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' || req.query.token !== config.telegram.token) {
    return res.status(403).end()
  }

  const bot = await getBot(config.telegram.token, config.database.uri)

  const update = req.body

  if (!update.message?.from?.id) {
    return res.status(403).end()
  }

  const userRepository = new UserRepository(await getDb(config.database.uri))

  const user = await userRepository.findByTelegramId(update.message.from.id)

  await bot
    .handleUpdate({ ...update, user })
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
}
