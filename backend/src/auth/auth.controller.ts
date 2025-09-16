// Authentication routes. Exposes login to exchange email/password for a JWT.
import { Controller, Post, Body, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  // POST /auth/login — validates credentials and returns an access token.
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.validateAndSign(dto.email, dto.password);
  }
}
