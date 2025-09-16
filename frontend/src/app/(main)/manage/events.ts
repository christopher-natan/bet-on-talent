import {EventEmitterService} from "@/services/event/event-emitter-service";

export type ManageEvents = {
  addParticipant: {
    firstName: string
    lastName: string
    participation: number
    color?: string
  }
}

export const manageBus = new EventEmitterService<ManageEvents>()

