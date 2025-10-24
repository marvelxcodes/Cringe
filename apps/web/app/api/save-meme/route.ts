import { NextRequest, NextResponse } from 'next/server';
import { saveMeme } from '@/lib/supabase/memes';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const prompt = formData.get('prompt') as string;
    const templateId = formData.get('templateId') as string;
    const userId = formData.get('userId') as string | null;
    const imageBlob = formData.get('image') as Blob;

    if (!prompt || !templateId || !imageBlob) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: prompt, templateId, and image',
        },
        { status: 400 }
      );
    }

    const result = await saveMeme(prompt, imageBlob, templateId, userId || undefined);

    if (!result.success) {
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in save-meme API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save meme',
      },
      { status: 500 }
    );
  }
}
