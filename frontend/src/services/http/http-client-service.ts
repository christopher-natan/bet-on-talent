// Lightweight HTTP client service used across models.
// Centralizes base URL, default headers, auth header injection, timeouts, and request lifecycle events.
import { APP_CONFIG } from '@/config'
import { EventEmitterService } from '@/services/event/event-emitter-service'
import type {
  HttpEvents,
  HttpMethod,
  HttpRequest,
  HttpSuccess,
  HttpError,
  Result,
} from './http-types'
import { getSessionToken } from '@/services/storage/session-storage-service'
import { ROUTES } from '@/routes'

// Simple unique id for correlating request lifecycle events
function uid() {
  return Math.random().toString(36).slice(2)
}

export class HttpClient {
  readonly baseUrl: string
  readonly events = new EventEmitterService<HttpEvents>()
  readonly defaultHeaders: Record<string, string>

  constructor(baseUrl = APP_CONFIG.apiBaseUrl, headers?: Record<string, string>) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.defaultHeaders = { 'Content-Type': 'application/json', ...headers }
  }

  // Core request wrapper that emits lifecycle events and normalizes results
  async request<T = unknown>(
    path: string,
    options: {
      method?: HttpMethod
      headers?: Record<string, string>
      body?: unknown
      timeoutMs?: number
      cache?: RequestCache
      next?: NextFetchRequestConfig
    } = {}
  ): Promise<Result<T>> {
    const id = uid()
    const url = path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
    const method = options.method ?? 'GET'
    const headers = { ...this.defaultHeaders, ...(options.headers ?? {}) }
    // Attach auth token from session storage if present and not already provided
    const token = getSessionToken()
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`
    }
    const startedAt = Date.now()
    const req: HttpRequest = { id, url, method, headers, body: options.body, startedAt }
    this.events.emit('requestStart', req)

    const controller = new AbortController()
    const timeout = options.timeoutMs ?? 15000
    const to = setTimeout(() => controller.abort(), timeout)

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: options.body != null && method !== 'GET' ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
        cache: options.cache,
        next: options.next,
      })
      clearTimeout(to)
      const durationMs = Date.now() - startedAt

      // Try to parse JSON safely; include raw text in parse error
      const text = await res.text().catch(() => '')
      let data: unknown = undefined
      try {
        data = text ? JSON.parse(text) : (undefined as unknown)
      } catch (e) {
        const err: HttpError = {
          ok: false,
          code: 'parse',
          status: res.status,
          message: 'Failed to parse response JSON',
          details: text,
          durationMs,
        }
        this.events.emit('requestError', { ...err, request: req })
        return err
      }

      // HTTP error path — normalize to HttpError and emit
      if (!res.ok) {
        const err: HttpError = {
          ok: false,
          code: 'http',
          status: res.status,
          message: (data as any)?.message ?? `HTTP ${res.status}`,
          details: data,
          durationMs,
        }
        this.events.emit('requestError', { ...err, request: req })
        return err
      }

      const success: HttpSuccess<T> = { ok: true, status: res.status, data: data as T, headers: res.headers, durationMs }
      this.events.emit('requestSuccess', { ...success, request: req })
      return success
    } catch (e: any) {
      clearTimeout(to)
      const durationMs = Date.now() - startedAt
      const code: HttpError['code'] = e?.name === 'AbortError' ? 'timeout' : 'network'
      const err: HttpError = {
        ok: false,
        code,
        message: e?.message ?? 'Network error',
        durationMs,
      }
      this.events.emit('requestError', { ...err, request: req })
      return err
    }
  }

  get<T>(path: string, opts?: Omit<Parameters<HttpClient['request']>[1], 'method' | 'body'>) {
    return this.request<T>(path, { ...opts, method: 'GET' })
  }

  post<T>(path: string, body?: unknown, opts?: Omit<Parameters<HttpClient['request']>[1], 'method'>) {
    return this.request<T>(path, { ...opts, method: 'POST', body })
  }

  put<T>(path: string, body?: unknown, opts?: Omit<Parameters<HttpClient['request']>[1], 'method'>) {
    return this.request<T>(path, { ...opts, method: 'PUT', body })
  }

  patch<T>(path: string, body?: unknown, opts?: Omit<Parameters<HttpClient['request']>[1], 'method'>) {
    return this.request<T>(path, { ...opts, method: 'PATCH', body })
  }

  delete<T>(path: string, opts?: Omit<Parameters<HttpClient['request']>[1], 'method' | 'body'>) {
    return this.request<T>(path, { ...opts, method: 'DELETE' })
  }
}

export const http = new HttpClient()

// Global 401 handler (client only):
// Redirect to Not Authorized on 401 for any endpoint except /auth/login (stay on the form to show errors there).
if (typeof window !== 'undefined') {
  http.events.on('requestError', (e: any) => {
    if (e?.status === 401) {
      const url: string = e?.request?.url || ''
      // Do not redirect on login endpoint failures; stay and show error
      const isAuthLogin = /\/auth\/login(\b|\?|$)/.test(url)
      if (!isAuthLogin) {
        try {
          window.location.href = ROUTES.NOT_AUTHORIZED
        } catch {}
      }
    }
  })
}
