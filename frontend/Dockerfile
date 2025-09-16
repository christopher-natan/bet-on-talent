# Multi-stage Dockerfile for Next.js on Cloud Run
# 1) Builder: install deps and build
# 2) Runner: copy standalone output and run node server

FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies based on lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build Next.js (standalone output configured in next.config.js)
ENV NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# Cloud Run provides the port via $PORT
ENV PORT=8080

# Copy the standalone server and required assets
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
# Some apps have no public folder; create an empty one to satisfy Next.js server expectations.
RUN mkdir -p public

# Drop privileges
USER node

EXPOSE 8080

CMD ["node", "server.js"]
