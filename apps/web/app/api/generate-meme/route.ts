import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateMemeRequest } from '@/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body: GenerateMemeRequest = await request.json();
    const { prompt, templateUrl } = body;

    if (!prompt || !templateUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: prompt and templateUrl',
        },
        { status: 400 }
      );
    }

    // Fetch the template image
    const imageResponse = await fetch(templateUrl);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch template image');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');

    // Use Gemini to generate the meme
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'image/png',
          data: base64Image,
        },
      },
      `You are a meme generator. Based on this template image and the following prompt, generate a witty, funny meme caption or text that fits the image perfectly. The prompt is: "${prompt}". 

Return ONLY the meme text/caption without any explanations or additional context. Make it punchy, relatable, and internet-culture appropriate.`,
    ]);

    const response = await result.response;
    const generatedText = response.text();

    // For now, return the generated text and the original image URL
    // In a production app, you might want to overlay the text on the image server-side
    return NextResponse.json({
      success: true,
      imageUrl: templateUrl,
      generatedText,
    });
  } catch (error) {
    console.error('Error in generate-meme API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate meme',
      },
      { status: 500 }
    );
  }
}
