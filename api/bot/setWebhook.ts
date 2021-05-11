import { VercelRequest, VercelResponse } from '@vercel/node'
import { getBot } from '../../src/bot'
import { config } from '../../src/config'

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(403).end()
  }

  const bot = getBot(config.telegram.token)

  await bot.telegram.setWebhook(`https://${config.vercel.domain}/api/bot/${config.telegram.token}`)

  res.status(200).json({ message: 'Webhook set :D' })
}