// Module for status/health endpoints.
import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';

@Module({
  controllers: [StatusController],
})
export class StatusModule {}
