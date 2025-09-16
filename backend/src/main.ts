// Application bootstrap. Sets up global validation, CORS, and starts HTTP server.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  // Validate and transform all incoming DTOs.
  // - whitelist: strip unknown properties
  // - forbidNonWhitelisted: reject payloads with unknown props
  // - transform: auto-convert primitives to expected types
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // Configure CORS from env (comma-separated). Use '*' to reflect request origin.
  const corsOrigins = config.get<string>('CORS_ORIGINS', 'http://localhost:3000');
  const originOption = corsOrigins === '*'
    ? true
    : corsOrigins.split(',').map((s) => s.trim()).filter(Boolean);

  app.enableCors({
    origin: originOption,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Start server on configured port (default 3001).
  const port = process.env.PORT || 3001;
  await app.listen(port as number, '0.0.0.0');
}

bootstrap();
