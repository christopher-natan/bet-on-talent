// Participants module. Provides endpoints and DB access for Participant entity.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { Participant } from './participant.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participant]), AuthModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsService],
  exports: [ParticipantsService],
})
export class ParticipantsModule {}
