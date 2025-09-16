// Conditionally enables JWT auth based on AUTH_JWT_ENABLED env flag.
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly config: ConfigService) {
    super();
  }

  // If auth is disabled, allow all requests; otherwise defer to Passport's guard.
  canActivate(context: ExecutionContext) {
    const enabled = this.config.get<string>('AUTH_JWT_ENABLED', 'false') === 'true';
    if (!enabled) {
      return true; // auth disabled: allow all
    }
    return super.canActivate(context) as any;
  }
}
