// Request body for updating a participant. Extends the create DTO with all fields optional.
import { PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDto } from './create-participant.dto';
import { IsInt, IsOptional, Min, IsString, Matches } from 'class-validator';

export class UpdateParticipantDto extends PartialType(CreateParticipantDto) {
  // Optional participation percentage: 0..100
  @IsOptional()
  @IsInt()
  @Min(0)
  participation?: number;

  // Optional hex color like #RRGGBB
  @IsOptional()
  @IsString()
  @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'color must be hex like #RRGGBB' })
  color?: string;
}
