import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { GenerateMemeRequest } from 'types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Helper function to detect MIME type from URL or content
function detectMimeType(url: string, contentType?: string | null): string {
  if (contentType) {
    return contentType;
  }
  
  const urlLower = url.toLowerCase();
  if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) {
    return 'image/jpeg';
  }
  if (urlLower.includes('.png')) {
    return 'image/png';
  }
  if (urlLower.includes('.gif')) {
    return 'image/gif';
  }
  if (urlLower.includes('.webp')) {
    return 'image/webp';
  }
  
  // Default to jpeg for imgflip and similar meme sites
  return 'image/jpeg';
}

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

    // Validate Gemini API key
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'API configuration error. Please check server setup.',
        },
        { status: 500 }
      );
    }

    // Fetch the template image
    const imageResponse = await fetch(templateUrl);
    if (!imageResponse.ok) {
      console.error(`Failed to fetch template image: ${imageResponse.status} ${imageResponse.statusText}`);
      throw new Error(`Failed to fetch template image: ${imageResponse.status}`);
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    
    // Detect the correct MIME type
    const mimeType = detectMimeType(templateUrl, imageResponse.headers.get('content-type'));
    console.log(`Using MIME type: ${mimeType} for URL: ${templateUrl}`);

    // Use Gemini to generate the meme
    // Use gemini-1.5-flash which is widely available for vision tasks
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Using model: gemini-1.5-flash');

    const systemPrompt = `You are a meme generator. Based on this template image and the following prompt, generate a witty, funny meme caption or text that fits the image perfectly. The prompt is: "${prompt}". 

Return ONLY the meme text/caption without any explanations or additional context. Make it punchy, relatable, and internet-culture appropriate.`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      systemPrompt,
    ]);

    const response = await result.response;
    const generatedText = response.text();

    if (!generatedText) {
      throw new Error('No text generated from AI model');
    }

    console.log(`Successfully generated meme text: ${generatedText.substring(0, 50)}...`);

    // For now, return the generated text and the original image URL
    // In a production app, you might want to overlay the text on the image server-side
    return NextResponse.json({
      success: true,
      imageUrl: templateUrl,
      generatedText,
    });
  } catch (error) {
    console.error('Error in generate-meme API:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to generate meme';
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific Google AI API error types
      if (error.message.includes('API key')) {
        errorMessage = 'Invalid or missing Gemini API key';
        statusCode = 401;
      } else if (error.message.includes('not found') || error.message.includes('404')) {
        errorMessage = 'Gemini model not available. This might be a temporary issue with the AI service.';
        statusCode = 503;
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Failed to fetch template image. Please check the URL.';
        statusCode = 400;
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = 'API quota exceeded. Please try again later.';
        statusCode = 429;
      } else if (error.message.includes('permission') || error.message.includes('403')) {
        errorMessage = 'Permission denied. Please check your API key permissions.';
        statusCode = 403;
      }
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
}
