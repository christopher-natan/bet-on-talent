export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type HttpRequest = {
  id: string
  url: string
  method: HttpMethod
  headers?: Record<string, string>
  body?: unknown
  startedAt: number
}

export type HttpSuccess<T> = {
  ok: true
  status: number
  data: T
  headers: Headers
  durationMs: number
}

export type HttpError = {
  ok: false
  status?: number
  code: 'network' | 'timeout' | 'http' | 'parse'
  message: string
  details?: unknown
  durationMs: number
}

export type Result<T> = HttpSuccess<T> | HttpError

export type HttpEvents = {
  requestStart: HttpRequest
  requestSuccess: HttpSuccess<unknown> & { request: HttpRequest }
  requestError: HttpError & { request: HttpRequest }
}

