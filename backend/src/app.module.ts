// Root application module.
// - Loads configuration from .env files (global ConfigModule)
// - Configures TypeORM (PostgreSQL) and auto-loads entities
// - Wires feature modules: Auth, Participants, Status
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantsModule } from './participants/participants.module';
import { Participant } from './participants/participant.entity';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
        '.env',
      ],
    }),
    // Database connection configured via environment variables.
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USERNAME', 'postgres'),
        password: config.get<string>('DB_PASSWORD', 'postgres'),
        database: config.get<string>('DB_NAME', 'postgres'),
        // Auto-load all entities declared in imported modules.
        entities: [Participant],
        // Enable schema sync in non-production for easier local development.
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
        autoLoadEntities: true,
      }),
    }),
    ParticipantsModule,
    AuthModule,
    StatusModule,
  ],
})
export class AppModule {}
