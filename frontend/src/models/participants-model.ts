import { http } from '@/services/http/http-client-service'

export type Participant = {
  id?: string
  firstName: string
  lastName: string
  participation: number // percent
  color: string
}

export type CreateParticipantInput = {
  firstName: string
  lastName: string
  participation: number
}

export async function getParticipants(): Promise<Participant[]> {
  const res = await http.get<Participant[]>('/participants')
  if (res.ok && Array.isArray(res.data)) {
    return res.data
  }
  return []
}

export async function deleteParticipants(id: string): Promise<Participant[]> {
  const res = await http.delete<Participant[]>('/participants/' + id);
  if (res.ok && Array.isArray(res.data)) {
    return res.data
  }
  return []
}

export async function createParticipant(input: CreateParticipantInput) {
  return http.post('/participants', input)
}
