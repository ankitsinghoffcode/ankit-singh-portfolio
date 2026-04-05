import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: Request) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname.startsWith('/login')

  if (isAdminRoute && !session) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url)
  }

  if (isLoginRoute && session) {
    const url = new URL('/admin', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
