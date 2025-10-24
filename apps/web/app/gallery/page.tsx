'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import MemeCard from '@/components/MemeCard';
import Button from '@/components/ui/button';
import type { Meme } from '@/types';

export default function GalleryPage() {
  const router = useRouter();
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/memes');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();

      if (data.success) {
        setMemes(data.memes);
      } else {
        setError(data.error || 'Failed to fetch memes');
      }
    } catch (err) {
      setError('An error occurred while fetching memes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMemeClick = (meme: Meme) => {
    window.open(meme.image_url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header - Untitled UI Style */}
        <div className="mb-8 sm:mb-12 animate-slideUp">
          <button
            onClick={() => router.push('/')}
            type="button"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Back</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Templates
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">Your Meme Gallery</h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            {memes.length > 0 ? `${memes.length} ${memes.length === 1 ? 'meme' : 'memes'} saved` : 'Your creative collection'}
          </p>
        </div>

        {/* Loading State - Untitled UI Style */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-brand-600 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-base font-medium">Loading your memes...</p>
          </div>
        )}

        {/* Error State - Untitled UI Style */}
        {error && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-16 h-16 bg-error-100 dark:bg-error-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Error</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-error-600 dark:text-error-400 text-base font-medium mb-6">{error}</p>
            <Button
              onPress={fetchMemes}
              variant="primary"
              size="md"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Empty State - Untitled UI Style */}
        {!loading && !error && memes.length === 0 && (
          <div className="text-center py-20 animate-fadeIn">
            <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <title>Gallery</title>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No memes yet!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Create your first meme and it will appear here. Start building your collection today!
            </p>
            <Button
              onPress={() => router.push('/')}
              variant="primary"
              size="lg"
            >
              Create Your First Meme
            </Button>
          </div>
        )}

        {/* Memes Grid - Untitled UI Style */}
        {!loading && !error && memes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {memes.map((meme) => (
              <MemeCard key={meme.id} meme={meme} onClick={handleMemeClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
