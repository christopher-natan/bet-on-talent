# Frontend and Backend Testing Guide

This guide explains how to test the backend API and the frontend app locally. It focuses on manual testing with curl/Postman and browser flows. It also outlines how to extend with automated tests.

## Prerequisites
- Backend running on `http://localhost:3001`
- Frontend running on `http://localhost:3000`
- PostgreSQL configured per `backend/.env.development`
- Default auth (unless changed):
  - `AUTH_EMAIL=dev@betontalent.com`
  - `AUTH_PASSWORD=admin`

## Backend: Quick Checks

- Health check
  - `curl -s http://localhost:3001/health | jq .`
  - Expect `{ status: "ok", db: "up" }` when DB is reachable.
- Config check
  - `curl -s http://localhost:3001/config | jq .`
  - Shows flags like `authJwtEnabled` and `nodeEnv`.
- Clear test data (development only)
  - `curl -X DELETE http://localhost:3001/clear`

## Backend: Auth and Participants API

1) Get a JWT token
```
curl -s -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"dev@betontalent.com","password":"admin"}'
```
- Copy the `access_token` from the response.
- Save it to a shell var for convenience:
```
TOKEN=$(curl -s -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"dev@betontalent.com","password":"admin"}' | jq -r .access_token)
```

2) Create a participant
```
curl -s -X POST http://localhost:3001/participants \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"firstName":"Alice","lastName":"Smith","participation":30}' | jq .
```

3) List participants
```
curl -s http://localhost:3001/participants \
  -H "Authorization: Bearer $TOKEN" | jq .
```

4) Delete a participant (replace :id)
```
curl -s -X DELETE http://localhost:3001/participants/1 \
  -H "Authorization: Bearer $TOKEN" | jq .
```

Tips
- 401/Unauthorized means the token is missing/invalid — re-login and retry.
- If CORS errors appear in the browser, ensure `CORS_ORIGINS` includes `http://localhost:3000`.

## Frontend: Browser Flows

1) Login
- Navigate to `http://localhost:3000/login`.
- Use the default credentials above.
- On success, you should be redirected to the Manage page.

2) Manage Participants
- Add a participant via the top form.
- Verify the table shows the new record and the graph updates.
- Use the delete action to remove a participant; confirm the table refreshes.

3) Unauthorized Handling
- Open DevTools → Application → Session Storage and clear the stored token key (`auth_token`).
- Navigate to `http://localhost:3000/(main)/manage` and confirm you’re redirected to the Not Authorized page.

## Postman Collection (optional)
- Create requests: `POST /auth/login`, `GET/POST/DELETE /participants`, `GET /health`, `GET /config`.
- Add a Postman environment with `baseUrl = http://localhost:3001` and a variable `token`.
- Use `Authorization: Bearer {{token}}` on participants requests; set `token` from login response.

## Automated Tests (future work)

Backend (NestJS + Jest)
- Install dev deps and initialize Jest (if not already):
```
npm i -D jest @types/jest ts-jest
npx ts-jest config:init
```
- Add unit tests for services (pure logic), and e2e tests using `@nestjs/testing` + Supertest for controllers.

Frontend
- Unit: React Testing Library + Jest for components and utilities.
- E2E: Playwright or Cypress for full user flows (login, add/delete participant).

Recommended scripts to add later
- Backend: `test`, `test:e2e`, `test:watch`
- Frontend: `test`, `test:watch`, `test:e2e`

Appendix: Troubleshooting
- DB connection failures: verify Postgres is running and credentials in `backend/.env.development` are correct.
- 500 errors: check `backend/dev.log` for stack traces.
- Network/CORS errors: confirm backend is on `3001` and `CORS_ORIGINS` includes the frontend URL.

