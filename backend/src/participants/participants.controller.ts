// REST endpoints for managing participants.
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { CreateParticipantDto } from './dto/create-participant.dto';


@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // POST /participants — create a new participant (JWT protected if enabled).
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateParticipantDto) {
    return this.participantsService.create(dto);
  }

  // GET /participants — list all participants (JWT protected if enabled).
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.participantsService.findAll();
  }

  // DELETE /participants/:id — remove a participant (JWT protected if enabled).
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantsService.remove(id);
  }
}
