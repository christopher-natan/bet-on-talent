// Simple session storage helpers for auth token.
// Note: guarded for SSR to avoid accessing window on the server.
export const SESSION_KEYS = {
  token: 'auth_token',
} as const

export function setSessionToken(token: string) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(SESSION_KEYS.token, token)
  } catch {}
}

export function getSessionToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage.getItem(SESSION_KEYS.token)
  } catch {
    return null
  }
}

export function clearSessionToken() {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(SESSION_KEYS.token)
  } catch {}
}
