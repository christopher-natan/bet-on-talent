// Business logic for managing participants.
import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Participant} from './participant.entity';
import {CreateParticipantDto} from './dto/create-participant.dto';
import {getRandomNiceColor} from '../common/utils/colors';
import {capitalizeName} from '../common/utils/util';

@Injectable()
export class ParticipantsService {
    constructor(@InjectRepository(Participant) private readonly repo: Repository<Participant>) {
    }

    // Create a new participant, normalizing names and defaulting color if missing.
    async create(dto: CreateParticipantDto): Promise<Participant> {
        const participant = this.repo.create({
            ...dto,
            firstName: capitalizeName(dto.firstName),
            lastName: capitalizeName(dto.lastName),
            color: dto.color ?? getRandomNiceColor(),
        });
        return this.repo.save(participant);
    }

    // Return all participants.
    findAll(): Promise<Participant[]> {
        return this.repo.find();
    }

    // Find a participant by id or throw NotFound.
    async findOne(id: number): Promise<Participant> {
        const participant = await this.repo.findOne({where: {id}});
        if (!participant) throw new NotFoundException(`Participant ${id} not found`);
        return participant;
    }

    // Remove a participant by id.
    async remove(id: number): Promise<void> {
        const participant = await this.findOne(id);
        await this.repo.remove(participant);
    }
}
