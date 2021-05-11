import { Composer, Context, Telegraf } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'
import { getDb } from './data/connection'
import { UserRepository } from './data/UserRepository'
import { getScreenshot } from './domain/carbon'
import { getLanguage } from './domain/carbon/languages'
import { getUrl } from './domain/carbon/url'
import { User } from './domain/User'
import { getConfigMiddleware } from './middleware/config'

export class AuthenticatedContext extends Context {
  public readonly carbon: { user: User }
  constructor(update: Update, tg: any, botInfo: any) {
    super(update, tg, botInfo)
    this.carbon = { user: (update as any).user }
  }
}

export const getBot = async (token: string, dbUri: string) => {
  const bot = new Telegraf(token, {
    telegram: { webhookReply: false },
    handlerTimeout: 900_000,
    contextType: AuthenticatedContext
  })

  const db = await getDb(dbUri)

  const userRepository = new UserRepository(db)

  bot.use(getConfigMiddleware(userRepository))

  bot.start((ctx) => {
    ctx.reply('Hi there! :D')
  })

  bot.use(
    Composer.entityText('pre', /^(?<language>[^ ]+\n)?(?<code>.*)/gs, async (ctx) => {
      try {
        if (!ctx.from) return

        const { language: languageString = 'auto', code } = ctx.match.groups || {}
        const language = getLanguage(languageString)

        if (!code) return

        ctx.replyWithChatAction('upload_photo')

        const settings = ctx.carbon.user.config.carbon
        const url = await getUrl(language || 'auto', code, settings)

        console.log(url)

        const image = await getScreenshot(url)

        return ctx.replyWithPhoto({ source: image })
      } catch (err) {
        console.error(err)
        return null
      }
    })
  )

  return bot
}
