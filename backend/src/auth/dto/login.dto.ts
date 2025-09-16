// Request body for POST /auth/login
// Uses class-validator decorators to ensure correct format and required fields.
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  // Email must be provided and in a valid format.
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // Password is required; actual credential check happens in AuthService.
  @IsNotEmpty()
  password: string;
}
