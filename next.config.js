/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-ping every 10 minutes to keep Render awake
  async headers() {
    return [
      {
        source: '/api/health',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
      {
        source: '/api/ping',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },
}

module.exports = nextConfig