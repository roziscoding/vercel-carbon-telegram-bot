import { Telegraf } from 'telegraf'

export const getBot = (token: string) => {
  const bot = new Telegraf(token, { telegram: { webhookReply: false } })

  bot.start((ctx) => {
    ctx.reply('Hi there! :D')
  })

  return bot
}
