"use client"
// Controller for the Login feature: holds state, performs the API call,
// saves the token, and redirects on success. View remains presentational.
import { useState } from 'react'
import { login } from '@/models/users-model'
import { setSessionToken } from '@/services/storage/session-storage-service'
import { STRINGS } from '@/strings'
import { http } from '@/services/http/http-client-service'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'

export function LoginController() {
  // Form state (prefilled for convenience during dev)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[] | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  // Submits the credentials and handles result. No redirects on failure.
  const submit = async () => {
    setErrors(null)
    setSubmitting(true)
    try {
      const res = await login({ email, password })
      const token = res.ok ? (res.data?.access_token ?? res.data?.token) : undefined
      if (token) {
        // Persist token and apply header immediately (no page reload required)
        setSessionToken(token)
        http.defaultHeaders['Authorization'] = `Bearer ${token}`
        // Navigate to manage after successful login
        router.replace(ROUTES.MANAGE)
        return true
      }
      const msg = (res as any).message || STRINGS.login.errors.generic
      setErrors([msg])
      return false
    } catch {
      setErrors([STRINGS.login.errors.generic])
      return false
    } finally {
      setSubmitting(false)
    }
  }

  return {
    state: { email, password, errors, submitting },
    actions: { setEmail, setPassword, submit },
  }
}
