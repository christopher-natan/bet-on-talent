// Operational status endpoints: health checks and config info.
import { Controller, Get, Delete } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Participant } from '../participants/participant.entity';

@Controller()
export class StatusController {
  constructor(
    private readonly config: ConfigService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  // GET /health — reports service uptime and DB status.
  @Get('health')
  async health() {
    let db = 'unknown';
    try {
      if (this.dataSource && this.dataSource.isInitialized) {
        await this.dataSource.query('SELECT 1');
        db = 'up';
      } else {
        db = 'not-initialized';
      }
    } catch {
      db = 'down';
    }
    return {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      db,
    };
  }

  // GET /config — exposes safe config flags helpful for the frontend.
  @Get('config')
  configInfo() {
    const enabled = this.config.get<string>('AUTH_JWT_ENABLED', 'false') === 'true';
    return {
      authJwtEnabled: enabled,
      nodeEnv: this.config.get<string>('NODE_ENV', 'development'),
    };
  }
}
