// Centralized route paths for navigation.
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  MANAGE: '/manage',
  NOT_AUTHORIZED: '/not-authorized',
} as const

export type RouteKey = keyof typeof ROUTES
