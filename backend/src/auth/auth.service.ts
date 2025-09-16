// Core authentication logic: validates environment-based credentials and signs JWTs.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Strings } from '../common/strings';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  // Verifies provided email/password against env credentials and returns a signed token.
  async validateAndSign(email: string, password: string) {
    const envUser = this.config.get<string>('AUTH_EMAIL');
    const envPass = this.config.get<string>('AUTH_PASSWORD');

    if (!envUser || !envPass || email !== envUser || password !== envPass) {
      throw new UnauthorizedException(Strings.AUTH_INVALID_CREDENTIALS);
    }

    const payload = { sub: 0, email };
    return {
      access_token: await this.jwt.signAsync(payload),
    };
  }
}
