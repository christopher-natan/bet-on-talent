// Users API model — encapsulates auth endpoints.
import { http } from '@/services/http/http-client-service'

// Backend expects email/password
export type LoginInput = {
  email: string
  password: string
}

// Support both shapes (access_token vs token) from backend
export type LoginResponse = {
  access_token?: string
  token?: string
  message?: string
}

// POST /auth/login, returns Result<LoginResponse>
export async function login(input: LoginInput) {
  return http.post<LoginResponse>('/auth/login', input)
}
