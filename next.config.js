/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MONGODB_URI: 'mongodb://localhost:27019/nextjs'
  },
}

module.exports = nextConfig
