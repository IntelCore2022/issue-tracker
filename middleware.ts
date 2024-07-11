import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY); // Ensure SECRET_KEY is set in your environment

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signup', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);

    return NextResponse.next();
  } catch (error) {
    console.error('JWT verification error:', error);

    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ['/issues/:path*'],
};
