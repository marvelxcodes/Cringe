import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Dynamic import to avoid build-time issues with database connection
    const { getMemes } = await import('database');
    const memes = await getMemes();

    return NextResponse.json({
      success: true,
      memes,
    });
  } catch (error) {
    console.error('Error in memes API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch memes',
      },
      { status: 500 }
    );
  }
}
