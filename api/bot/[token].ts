import { VercelRequest, VercelResponse } from '@vercel/node'
import { getBot } from '../../src/bot'
import { config } from '../../src/config'

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST' || req.query.token !== config.telegram.token) {
    return res.status(403).end()
  }

  const bot = getBot(config.telegram.token)

  bot
    .handleUpdate(req.body)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      res.status(500).json({ err })
    })
}
