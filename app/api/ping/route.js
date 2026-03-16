import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    alive: true,
    pinged_at: new Date().toISOString(),
    service: 'six-figure-playbook',
  }, { status: 200 })
}