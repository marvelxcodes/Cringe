import { supabase } from './client';
import type { Meme } from '@/types';

/**
 * Save a generated meme to Supabase
 */
export async function saveMeme(
  prompt: string,
  imageBlob: Blob,
  templateId: string,
  userId?: string
): Promise<{ success: boolean; memeId?: string; imageUrl?: string; error?: string }> {
  try {
    // Generate a unique filename
    const filename = `meme-${Date.now()}-${Math.random().toString(36).substring(7)}.png`;

    // Upload image to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('memes')
      .upload(filename, imageBlob, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      return { success: false, error: 'Failed to upload image' };
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('memes').getPublicUrl(filename);
    const imageUrl = urlData.publicUrl;

    // Save meme metadata to database
    const { data: memeData, error: dbError } = await supabase
      .from('memes')
      .insert({
        prompt,
        image_url: imageUrl,
        template_id: templateId,
        user_id: userId || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Error saving meme metadata:', dbError);
      return { success: false, error: 'Failed to save meme metadata' };
    }

    return {
      success: true,
      memeId: memeData.id,
      imageUrl,
    };
  } catch (error) {
    console.error('Error in saveMeme:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Fetch all saved memes
 */
export async function getMemes(): Promise<Meme[]> {
  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching memes:', error);
    throw new Error('Failed to fetch memes');
  }

  return data || [];
}

/**
 * Fetch memes by user ID
 */
export async function getMemesByUserId(userId: string): Promise<Meme[]> {
  const { data, error } = await supabase
    .from('memes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user memes:', error);
    throw new Error('Failed to fetch user memes');
  }

  return data || [];
}

/**
 * Delete a meme by ID
 */
export async function deleteMeme(memeId: string): Promise<boolean> {
  const { error } = await supabase.from('memes').delete().eq('id', memeId);

  if (error) {
    console.error('Error deleting meme:', error);
    return false;
  }

  return true;
}
