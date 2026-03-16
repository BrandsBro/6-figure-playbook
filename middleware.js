import { NextResponse } from 'next/server'

const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN

export function middleware(request) {
  const { pathname, method } = request.nextUrl

  // Protect /admin page
  if (pathname.startsWith('/admin')) {
    const token = request.nextUrl.searchParams.get('token')
      || request.cookies.get('admin_token')?.value

    if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
      return new NextResponse(
        `<!DOCTYPE html><html><head><title>403</title>
        <style>body{background:#09090B;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;font-family:sans-serif;text-align:center;}h1{color:#fff;font-size:5rem;margin:0;}p{color:#52525B;}</style>
        </head><body><div><h1>403</h1><p>Access denied.</p></div></body></html>`,
        { status: 403, headers: { 'Content-Type': 'text/html' } }
      )
    }

    const response = NextResponse.next()
    response.cookies.set('admin_token', token, {
      httpOnly: true, secure: true, sameSite: 'strict', maxAge: 60 * 60 * 8
    })
    return response
  }

  // /api/leads POST — public (visitors submitting form)
  // /api/leads GET  — protected (admin reading leads)
  if (pathname.startsWith('/api/leads') && request.method === 'GET') {
    const authHeader = request.headers.get('x-admin-token')
    const cookieToken = request.cookies.get('admin_token')?.value
    if (!ADMIN_TOKEN || (authHeader !== ADMIN_TOKEN && cookieToken !== ADMIN_TOKEN)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  // /api/analytics GET — protected (admin reading events)
  // /api/analytics POST — public (visitors triggering events)
  if (pathname.startsWith('/api/analytics') && request.method === 'GET') {
    const authHeader = request.headers.get('x-admin-token')
    const cookieToken = request.cookies.get('admin_token')?.value
    if (!ADMIN_TOKEN || (authHeader !== ADMIN_TOKEN && cookieToken !== ADMIN_TOKEN)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/leads/:path*', '/api/analytics/:path*'],
}