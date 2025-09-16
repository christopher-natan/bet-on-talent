// Auth module. Configures JWT strategy/guard and exposes AuthController.
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    // Configure JWT signing with secrets and expiration from env.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'dev-secret',
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN', '24h') },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
