/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/health": ["node_modules/**/compressjs*/**/*"],
    },
  },
};

module.exports = nextConfig;
