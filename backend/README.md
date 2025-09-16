# BetOnTalent Backend

NestJS REST API using TypeORM and PostgreSQL. Provides participant management, auth via JWT, and basic operational endpoints.

## Quick Start

- Prerequisites
  - Node.js 20.x and npm 9+
  - PostgreSQL database (Aiven-compatible). For Aiven, SSL is required.
- Install
  - `npm ci`
- Environment
  - Create `.env.development` for local dev and `.env.production` for prod. See variables below.
  - For Aiven or other managed Postgres that enforces TLS, set `DB_SSL=true`.
- Run
  - Dev: `npm run start:dev` (default port `3001`)
  - Prod (local): `npm run build && npm run start:prod`
  - Health: `GET /health` (checks DB), Config: `GET /config`

## Environment Variables

- Core
  - `NODE_ENV`: `development` | `production`
  - `PORT`: HTTP port (Cloud Run sets `$PORT`, defaults to 3001 locally)
- Database (TypeORM)
  - `DB_HOST`: Postgres host
  - `DB_PORT`: Postgres port
  - `DB_USERNAME`: Postgres user
  - `DB_PASSWORD`: Postgres password
  - `DB_NAME`: Database name
  - `DB_SSL`: `true` to enable TLS. For Aiven, this must be `true`. In code, this maps to `ssl: { rejectUnauthorized: false }`.
- Auth
  - `JWT_SECRET`: Secret for signing JWTs (required in prod)
  - `JWT_EXPIRES_IN`: e.g., `24h`
  - `AUTH_EMAIL`, `AUTH_PASSWORD`: Seed credentials for simple auth flow
  - `AUTH_JWT_ENABLED`: `true` to require JWT
- CORS
  - `CORS_ORIGINS`: Comma-separated list (e.g., `http://localhost:3000,https://app.example.com`). Use `*` to reflect request origin.

## Running and Scripts

- `npm run start:dev`: Watch mode
- `npm run build`: Compile TypeScript to `dist/`
- `npm run start:prod`: Start compiled app
- `npm test`, `npm run test:watch`, `npm run test:cov`
- `npm run format`: Prettier formatting for `src/**/*.ts`

## Architecture

- NestJS modules in `src/`
  - `AppModule`: loads config and TypeORM, wires feature modules.
  - `participants`: entity, module, service.
  - `status`: `/health` and `/config` endpoints.
- TypeORM
  - Auto-loads entities; `synchronize` is enabled only when `NODE_ENV !== 'production'`.
  - No migrations are configured yet. For schema changes, prefer adding migrations for production safety.

## Code Guidelines

- TypeScript + NestJS conventions (providers, modules, DTOs).
- Validation
  - Global `ValidationPipe` with `whitelist`, `forbidNonWhitelisted`, and `transform` is enabled.
  - Define DTOs with `class-validator`/`class-transformer` for all inputs.
- Formatting
  - Use `npm run format` before pushing. Keep imports clean and consistent.
- Error handling
  - Throw Nest HTTP exceptions (`BadRequestException`, `UnauthorizedException`, etc.).
- Configuration
  - Use `@nestjs/config` to read env values; avoid hardcoding.
- Commits & branches
  - Prefer Conventional Commits (e.g., `feat:`, `fix:`, `chore:`).
  - Branch naming: `feature/<summary>`, `fix/<bug>`, `chore/<task>`.
  - Keep PRs focused and small; include context and test notes.

## Database & TLS

- Managed Postgres (Aiven) requires SSL; set `DB_SSL=true`.
- Optional strict verification:
  - Obtain provider CA cert and mount it; adjust TypeORM SSL to use `ca` and set `rejectUnauthorized: true`.
- Common error
  - `no pg_hba.conf entry ... no encryption`: indicates SSL is off. Ensure `DB_SSL=true`.

## Deployment

- Cloud Run: Dockerfile is provided and the app binds to `0.0.0.0` on `$PORT`.
- Secrets: Prefer GCP Secret Manager for production secrets (`DB_PASSWORD`, `JWT_SECRET`).

## Troubleshooting

- Health failing (`/health` shows `db: down`)
  - Verify DB host/port/user/password/name and that `DB_SSL=true` for managed providers.
  - Check outbound access/VPC if the DB is private.
- Service not reachable on Cloud Run
  - Ensure it listens on `$PORT` and `0.0.0.0` (already configured).
- CORS issues
  - Confirm `CORS_ORIGINS` includes your frontend origin(s).

## License

Proprietary/internal. Do not distribute without permission.

