import { NextRequest, NextResponse } from 'next/server';
import { getTemplates } from '@/lib/supabase/templates';

// Mock data for development when Supabase is not configured
const MOCK_TEMPLATES = [
  {
    id: '1',
    name: 'Drake Hotline Bling',
    image_url: 'https://i.imgflip.com/30b1gx.jpg',
    category: 'funny',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Distracted Boyfriend',
    image_url: 'https://i.imgflip.com/1ur9b0.jpg',
    category: 'funny',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Two Buttons',
    image_url: 'https://i.imgflip.com/1g8my4.jpg',
    category: 'funny',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Change My Mind',
    image_url: 'https://i.imgflip.com/24y43o.jpg',
    category: 'wholesome',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Expanding Brain',
    image_url: 'https://i.imgflip.com/1jwhww.jpg',
    category: 'dank',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Disaster Girl',
    image_url: 'https://i.imgflip.com/1bgw.jpg',
    category: 'dank',
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Success Kid',
    image_url: 'https://i.imgflip.com/1bhk.jpg',
    category: 'wholesome',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Roll Safe Think About It',
    image_url: 'https://i.imgflip.com/1h7in3.jpg',
    category: 'funny',
    created_at: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    // Try to get templates from Supabase
    try {
      const templates = await getTemplates();
      return NextResponse.json({
        success: true,
        templates,
      });
    } catch (supabaseError) {
      // If Supabase fails, return mock data for development
      console.warn('Supabase not configured, using mock data:', supabaseError);
      return NextResponse.json({
        success: true,
        templates: MOCK_TEMPLATES,
      });
    }
  } catch (error) {
    console.error('Error in templates API:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch templates',
      },
      { status: 500 }
    );
  }
}
