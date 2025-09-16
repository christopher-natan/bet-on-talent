# Bet On Talent — Frontend

A Next.js 14 + React 18 + TypeScript + Tailwind CSS app. This README covers local development, testing, coding guidelines, and deployment to Google Cloud Run.

## Requirements
- Node.js 20.x and npm 10+
- Optional: Docker 24+ and gcloud CLI for Cloud Run deployments

## Quick Start
```bash
# Install
npm ci

# Run in dev mode (http://localhost:3000)
npm run dev

# Type-check and build for production
npm run build

# Start production server locally
npm start
```

## Scripts
- `npm run dev` — Start Next.js dev server
- `npm run build` — Build the app (standalone output)
- `npm start` — Start production server
- `npm run lint` — Lint with ESLint
- `npm run lint:fix` — Lint and auto-fix issues
- `npm run format` — Format with Prettier
- `npm run format:check` — Verify formatting without writing changes
- `npm run test` — Run tests (Vitest, JSDOM)
- `npm run test:watch` — Watch mode for tests

## Environment Variables
- Use `.env.local` for local development and `.env.production` for production defaults.
- Public client-side vars must be prefixed with `NEXT_PUBLIC_`.
- Example: `NEXT_PUBLIC_API_BASE_URL`, `SESSION_SECRET` (server only), etc.

## Testing
This project uses Vitest and Testing Library.

```bash
# Run once
npm run test

# Watch mode
npm run test:watch
```

Guidelines for tests:
- Test user-visible behavior via `@testing-library/react`.
- Prefer `screen.getByRole`/`getByText` queries that reflect accessibility.
- Keep tests colocated under `tests/` with file names mirroring the code under test.
- Avoid mocking unnecessarily; mock network boundaries only.

## Coding Guidelines
- TypeScript: strict mode is enabled. Type everything and avoid `any`.
- Components: use function components and React hooks; prefer small, focused components.
- Styling: Tailwind CSS is used; prefer utility classes and avoid inline styles.
- State: colocate state with components; keep controllers/hooks in `src/app/**/components` as seen in current patterns.
- File structure and aliases:
  - `@/app/*` → `src/app/*`
  - `@/components/*` → `src/components/*`
  - `@/models/*`, `@/services/*`, `@/utils/*`, `@/strings`, `@/routes`
- Accessibility: label interactive elements (`aria-label`, `title`) and use semantic HTML.
- Lint/format: run `npm run lint` and `npm run format` before pushing.

### Editor Setup
- VS Code: install "ESLint" and "Prettier" extensions. Repo includes `.vscode/settings.json` to format on save and apply ESLint fixes automatically.

### CI Tips
- To enforce in CI:
  - `npm run lint` and `npm run format:check` as separate steps.
  - For pre-commit hooks, add `husky` + `lint-staged` (optional).

## Docker
A production-ready Dockerfile is provided using Next.js standalone output.

```bash
# Build image
docker build -t bet-on-talent-frontend:local .

# Run container locally (port 8080 inside container)
docker run --rm -p 8080:8080 \
  --env PORT=8080 \
  bet-on-talent-frontend:local

# App will be available at http://localhost:8080
```

## Deploy to Google Cloud Run
Cloud Run deployment is container-based and works well with the provided Dockerfile.

```bash
export REGION=us-central1
export PROJECT_ID=your-project-id
export REPO=web
export SERVICE_NAME=bet-on-talent-frontend

# Build
docker build -t $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$SERVICE_NAME:latest .

# Push (Artifact Registry)
gcloud auth configure-docker $REGION-docker.pkg.dev

docker push $REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$SERVICE_NAME:latest

# Deploy
gcloud run deploy $SERVICE_NAME \
  --image=$REGION-docker.pkg.dev/$PROJECT_ID/$REPO/$SERVICE_NAME:latest \
  --region=$REGION \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --memory=512Mi \
  --cpu=1 \
  --max-instances=10 \
  --set-env-vars=NODE_ENV=production
```

Notes:
- The app listens on `$PORT` (default 8080) as required by Cloud Run.
- Add additional env vars (particularly `NEXT_PUBLIC_*`) via `--set-env-vars` or in the Cloud Run UI.
- See `DEPLOY-CLOUD-RUN.md` in this repo for more details.

## Google Cloud Build CI/CD
Build and deploy via Cloud Build using `cloudbuild.yaml` (Artifact Registry).

Prereqs:
- Enable Artifact Registry, Cloud Build, and Cloud Run APIs.
- Create an Artifact Registry repo (once):
  - `gcloud artifacts repositories create $REPO --repository-format=docker --location=$REGION`

Run manually from the repo root:
```bash
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions=_REGION=us-central1,_REPO=web,_SERVICE_NAME=bet-on-talent-frontend
```

Notes:
- The pipeline tags the image with both `$SHORT_SHA` and `latest`, then deploys to Cloud Run.
- Set additional env vars for the service by editing the deploy step in `cloudbuild.yaml`.

## Troubleshooting
- Type errors from tests during `tsc`: run `npm run test` with Vitest instead of `tsc` type-checking tests directly.
- Next.js build fails due to missing env vars: set required vars in your shell or `.env.*` files.
- Port conflicts locally: change the mapped port on `docker run -p <host>:8080`.
 - 403 Forbidden on Cloud Run default URL: usually means the service requires authentication or ingress is restricted. Fix by ensuring both are set on the service:
   - Authentication: allow unauthenticated invocations (grant `roles/run.invoker` to `allUsers`).
   - Ingress: set to `all` (not internal-only).
   - CLI examples:
     - `gcloud run services add-iam-policy-binding betontalent-frontend --member=allUsers --role=roles/run.invoker --region=asia-southeast1 --platform=managed`
     - `gcloud run services update betontalent-frontend --ingress=all --region=asia-southeast1 --platform=managed`
   - If org policy blocks public access, access via authenticated requests instead:
     - `curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" https://<service-url>`

## License
Proprietary — internal project. Do not distribute without permission.
