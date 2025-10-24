import { supabase } from './client';
import type { Template } from 'types';

/**
 * Fetch meme templates from Supabase with pagination
 */
export async function getTemplates(page = 1, limit = 10): Promise<Template[]> {
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .order('created_at', { ascending: false })
    .range(start, end);

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

/**
 * Add a new meme template to Supabase
 */
export async function addTemplate(template: {
	name: string;
	image_url: string;
	category: string;
}): Promise<Template | null> {
	const { data: existing } = await supabase
		.from('templates')
		.select('name')
		.eq('name', template.name)
		.single();

	if (existing) {
		console.log('template already exists');
		return null;
	}

	const { data, error } = await supabase
		.from('templates')
		.insert([template])
		.select();

	if (error) {
		console.error('Error adding template:', error);
		return null;
	}

	return data?.[0] as Template;
}
