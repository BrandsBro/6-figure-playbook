// scripts/cron-ping.js
// Keeps Render from sleeping by pinging the health endpoint
// Run with: node scripts/cron-ping.js

const SITE_URL = process.env.SITE_URL || 'https://your-render-url.onrender.com'
const INTERVAL  = 10 * 60 * 1000 // 10 minutes

async function ping() {
  try {
    const res = await fetch(`${SITE_URL}/api/ping`)
    const data = await res.json()
    console.log(`[${new Date().toISOString()}] ✅ Ping OK:`, data)
  } catch (err) {
    console.error(`[${new Date().toISOString()}] ❌ Ping failed:`, err.message)
  }
}

console.log(`🚀 Cron started — pinging ${SITE_URL} every 10 minutes`)
ping() // immediate first ping
setInterval(ping, INTERVAL)