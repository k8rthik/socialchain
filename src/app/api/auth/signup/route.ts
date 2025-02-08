// src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, city, insta, linkedin, email, password } = await req.json();

  // For now, just log the data to simulate user creation.
  console.log('New User:', { username, city, insta, linkedin, email, password });

  // Here you'd ideally save the user data to your database, including password hashing.

  return NextResponse.json({ message: 'Signup successful. You can now log in.' });
}
