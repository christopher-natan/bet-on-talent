"use client"
// Controller for the top form bar (create participant) + global controls (theme, logout)
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { createParticipant } from '@/models/participants-model'
import { STRINGS } from '@/strings'
import { manageBus } from '@/app/(main)/manage/events'
import { clearSessionToken, getSessionToken } from '@/services/storage/session-storage-service'
import { ROUTES } from '@/routes'

export function TopFormController() {
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [part, setPart] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ first?: string; last?: string; part?: string }>({})
  const { resolvedTheme, setTheme } = useTheme()
  const router = useRouter()

  // Validates local form inputs; returns error bag
  const validate = () => {
    const next: { first?: string; last?: string; part?: string } = {}
    if (!first.trim()) next.first = STRINGS.topForm.errors.firstRequired
    if (!last.trim()) next.last = STRINGS.topForm.errors.lastRequired
    if (!part.toString().trim()) next.part = STRINGS.topForm.errors.participationRequired
    else if (Number.isNaN(parseFloat(part))) next.part = STRINGS.topForm.errors.participationNumber
    setErrors(next)
    return next
  }

  // Submit participant creation; notifies Manage via event bus on success
  const handleSubmit = async () => {
    const participation = parseFloat(part)
    const v = validate()
    if (v.first || v.last || v.part) return
    setSubmitting(true)
    setError(null)
    const res: any = await createParticipant({
      firstName: first,
      lastName: last,
      participation,
    })
    setSubmitting(false)
    if (res.ok) {
      // Notify Manage module to refresh
      manageBus.emit('addParticipant', res.data);
      setFirst('')
      setLast('')
      setPart('')
      setErrors({})
    } else {
      setError(res.message || STRINGS.topForm.errors.saveFailed)
    }
  }

  const handleActions = {
    setFirst: (v: string) => {
      setFirst(v)
      if (errors.first) setErrors({...errors, first: undefined})
    },
    setLast: (v: string) => {
      setLast(v)
      if (errors.last) setErrors({...errors, last: undefined})
    },
    setPart: (v: string) => {
      const trimmed = v.trim()
      // keep digits and dots
      let sanitized = trimmed.replace(/[^0-9.]/g, '')
      // allow only one dot
      const firstDot = sanitized.indexOf('.')
      if (firstDot !== -1) {
        sanitized = sanitized.slice(0, firstDot + 1) + sanitized.slice(firstDot + 1).replace(/\./g, '')
      }
      // prevent just '.' or empty
      const next = sanitized === '' || sanitized === '.' ? '0' : sanitized
      setPart(next)
      if (errors.part) setErrors({...errors, part: undefined})
    },
    submit: handleSubmit,
    // Toggle dark/light theme
    toggleTheme: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    logout: () => {
      // Clear auth and send user to Login
      clearSessionToken()
      router.replace(ROUTES.LOGIN)
    },
  }

  const handleState = { first, last, part, submitting, error, errors, theme: resolvedTheme }

  return {
    state: handleState,
    actions: handleActions,
  }
}
