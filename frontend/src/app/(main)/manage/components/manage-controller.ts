"use client"
// Controller for Manage module: loads participants, listens to add events,
// exposes actions, and guards access (redirects when not authenticated).
import { useEffect, useState } from 'react'
import { deleteParticipants, getParticipants, type Participant } from '@/models/participants-model'
import { manageBus } from '@/app/(main)/manage/events'
import { getSessionToken } from '@/services/storage/session-storage-service'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'

export function ManageController() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const hasRecords = participants.length > 0
  const router = useRouter()
  const apiGetParticipants = async () => {
    // Load from API and set local state. Errors are ignored for brevity.
    const result = await getParticipants()
    setParticipants(result)
  }

  const onAddParticipant = () => {
    return manageBus.on('addParticipant', async (data) => {
      // Optimistically add the new participant to local state
      setParticipants((prev) => [
        ...prev,
        {...data} as Participant,
      ])
    })
  }

  useEffect(() => {
    // Initial load + subscribe to add events
    apiGetParticipants().then()
    const offAdd = onAddParticipant()
    return () => {
      offAdd()
    }
  }, [])

  useEffect(() => {
    // Auth guard: if no token, redirect to Not Authorized
    const token = getSessionToken()
    if (!token) {
      router.replace(ROUTES.NOT_AUTHORIZED)
    }
  }, [router])

  const deleteParticipantAt = async (index: number) => {
    // Optimistic delete; call backend when id exists
    const target = participants[index]
    if (target?.id) {
      try {
        await deleteParticipants(target.id)
        setParticipants((prev) => prev.filter((_, i) => i !== index))
      } catch {
      }
    }
  }

  return {
    state: {participants},
    actions: {refresh: apiGetParticipants, deleteAt: deleteParticipantAt},
    hasRecords,
    participants
  }
}
