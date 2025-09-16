# Multi-stage Dockerfile for NestJS on Cloud Run
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first (better layer caching)
COPY package*.json ./
# Native builds (e.g., bcrypt) may require build tools on Alpine
RUN apk add --no-cache python3 make g++ \
  && npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# Prune dev dependencies to prepare production node_modules
RUN npm prune --omit=dev

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy production node_modules and compiled app from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .
COPY --from=builder /app/.env.production .

# Expose Cloud Run port
ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "dist/main.js"]
