import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // Check if user exists
    const moderator = await prisma.moderator.findUnique({
      where: { username },
    });

    if (!moderator) {
      return NextResponse.json(
        { error: 'Username not found.' },
        { status: 404 }
      );
    }

    // Compare password
    const isValid = await bcrypt.compare(password, moderator.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Incorrect password.' },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = cookies();
    (await cookieStore).set('session', moderator.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
