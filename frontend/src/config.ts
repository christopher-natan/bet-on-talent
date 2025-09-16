// Centralized application configuration
const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_PROD = NODE_ENV === 'production'

// Enforce API base URL in production. In dev, default to localhost.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (IS_PROD ? '' : 'http://localhost:3001')
if (IS_PROD && !API_BASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_BASE_URL. Set it in .env.production for production builds.')
}

export const APP_CONFIG = {
  /* common config */
  name: 'Bet On Talent',
  env: NODE_ENV,
  apiBaseUrl: API_BASE_URL,

  /* graph config */
  graphStroke: 1,
}
