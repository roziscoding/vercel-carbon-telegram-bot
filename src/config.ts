export const config = {
  telegram: {
    token: process.env.TELEGRAM_TOKEN ?? ''
  },
  vercel: {
    domain: process.env.VERCEL_URL ?? 'localhost:3000'
  }
}