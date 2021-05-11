import { Context, MiddlewareFn } from 'telegraf'
import { Update } from 'typegram'
import { UserRepository } from '../data/UserRepository'

const setConfig =
  (telegramId: number | undefined, userRepository: UserRepository) =>
  async (type: 'bot' | 'carbon', key: string, value: string | boolean) => {
    if (!telegramId) return

    await userRepository.setConfig(telegramId, type, key, value)
  }

const getConfig =
  (telegramId: number | undefined, userRepository: UserRepository) =>
  async (type: 'bot' | 'carbon', key: string) => {
    if (!telegramId) return null

    return userRepository.getConfig(telegramId, type, key)
  }

const config = (telegramId: number | undefined, userRepository: UserRepository) => ({
  set: setConfig(telegramId, userRepository),
  get: getConfig(telegramId, userRepository)
})

export type ConfigMiddleware = ReturnType<typeof config>

export type ContextWithConfig = Update & { config: ConfigMiddleware }

export const getConfigMiddleware = (userRepository: UserRepository): MiddlewareFn<Context> => (ctx, next) => {
  const telegramId = ctx.from?.id

  Object.defineProperty(ctx, 'config', {
    get: () => {
      return config(telegramId, userRepository)
    }
  })

  next()
}
