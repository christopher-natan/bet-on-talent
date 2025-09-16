/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React Strict Mode to prevent dev double-execution of effects
  reactStrictMode: false,
  // Produce a standalone build ideal for Docker/Cloud Run
  output: 'standalone',
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
