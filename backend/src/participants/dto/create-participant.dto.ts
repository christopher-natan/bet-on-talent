// Request body for creating a participant.
import { IsInt, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, Min } from 'class-validator';

export class CreateParticipantDto {
  // Participant first name (1..100 chars)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  firstName: string;

  // Participant last name (1..100 chars)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  lastName: string;

  // Participation percentage: 0..100
  @IsInt()
  @Min(0)
  participation: number;

  // Optional hex color like #RRGGBB
  @IsOptional()
  @IsString()
  @Matches(/^#([0-9a-fA-F]{6})$/, { message: 'color must be hex like #RRGGBB' })
  color?: string;
}
