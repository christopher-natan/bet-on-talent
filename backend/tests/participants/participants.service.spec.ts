import { NotFoundException } from '@nestjs/common';
import { ParticipantsService } from '../../src/participants/participants.service';
import { Participant } from '../../src/participants/participant.entity';

describe('ParticipantsService', () => {
  function createRepoMock() {
    const store = new Map<number, Participant>();
    let seq = 1;
    return {
      create: jest.fn((obj: any) => ({ ...obj })),
      save: jest.fn(async (obj: any) => {
        if (!('id' in obj)) (obj as any).id = seq++;
        store.set((obj as any).id, obj as any);
        return obj as any;
      }),
      find: jest.fn(async () => Array.from(store.values())),
      findOne: jest.fn(async ({ where: { id } }: any) => store.get(id)),
      remove: jest.fn(async (obj: any) => {
        store.delete(obj.id);
      }),
    } as any;
  }

  it('creates a participant with capitalized names and keeps provided color', async () => {
    const repo = createRepoMock();
    const svc = new ParticipantsService(repo);
    const res = await svc.create({
      firstName: 'ada',
      lastName: 'lovelace',
      participation: 42,
      color: '#AABBCC',
    } as any);
    expect(res.id).toBeDefined();
    expect(res.firstName).toBe('Ada');
    expect(res.lastName).toBe('Lovelace');
    expect(res.color).toBe('#AABBCC');
  });

  it('findOne throws NotFound when missing', async () => {
    const repo = createRepoMock();
    const svc = new ParticipantsService(repo);
    await expect(svc.findOne(123)).rejects.toThrow(NotFoundException);
  });
});

