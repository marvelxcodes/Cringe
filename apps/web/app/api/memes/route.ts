import { NextRequest, NextResponse } from 'next/server';
import { getMemes } from 'database';

export async function GET(request: NextRequest) {
  try {
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
