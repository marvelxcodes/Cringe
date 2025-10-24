import { supabase } from './client';
import type { Template } from '@/types';

/**
 * Fetch all meme templates from Supabase
 */
export async function getTemplates(): Promise<Template[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching templates:', error);
    throw new Error('Failed to fetch templates');
  }

  return data || [];
}

/**
 * Fetch templates by category
 */
export async function getTemplatesByCategory(category: string): Promise<Template[]> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching templates by category:', error);
    throw new Error('Failed to fetch templates');
  }

  return data || [];
}

/**
 * Get a single template by ID
 */
export async function getTemplateById(id: string): Promise<Template | null> {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching template:', error);
    return null;
  }

  return data;
}
