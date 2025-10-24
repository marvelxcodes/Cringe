'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import TemplateGrid from '@/components/TemplateGrid';
import type { Template } from '@/types';

export default function Page() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const categories = ['all', 'funny', 'wholesome', 'dank', 'trending', 'custom'];

  // Initial load
  useEffect(() => {
    const loadInitialTemplates = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = '/api/templates?page=1&limit=10';
        if (selectedCategory && selectedCategory !== 'all') {
          url += `&category=${selectedCategory}`;
        }
        
        const response = await fetch(url);
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        
        const data = await response.json();

        if (data.success) {
          setTemplates(data.templates);
          setPage(2);
          setHasMore(data.templates.length > 0);
        } else {
          setError(data.error || 'Failed to fetch templates');
        }
      } catch (err) {
        setError('An error occurred while fetching templates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialTemplates();
  }, [selectedCategory]);

  // Load more templates function
  const loadMoreTemplates = async () => {
    if (loading || !hasMore) return;
    
    console.log('Loading more templates, current page:', page, 'current templates count:', templates.length);
    setLoading(true);
    
    try {
      let url = `/api/templates?page=${page}&limit=10`;
      if (selectedCategory && selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      
      console.log('Fetching URL:', url);
      const response = await fetch(url);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();
      console.log('Received data:', data);

      if (data.success) {
        console.log('Before update - existing templates:', templates.length, 'new templates:', data.templates.length);
        setTemplates(prev => {
          const newTemplates = [...prev, ...data.templates];
          console.log('After update - total templates:', newTemplates.length);
          return newTemplates;
        });
        setPage(prev => prev + 1);
        setHasMore(data.templates.length > 0);
      } else {
        setError(data.error || 'Failed to fetch templates');
      }
    } catch (err) {
      setError('An error occurred while fetching templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '/api/templates?page=1&limit=10';
      if (selectedCategory && selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`;
      }
      
      const response = await fetch(url);
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      
      const data = await response.json();

      if (data.success) {
        setTemplates(data.templates);
        setPage(2);
        setHasMore(data.templates.length > 0);
      } else {
        setError(data.error || 'Failed to fetch templates');
      }
    } catch (err) {
      setError('An error occurred while fetching templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);



  const handleSelectTemplate = (template: Template) => {
    sessionStorage.setItem('selectedTemplate', JSON.stringify(template));
    router.push('/generate');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
      <Navigation />
      
      {/* Hero Section - Untitled UI Style */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-16 sm:py-24 lg:py-32 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-slideUp">
            {/* Badge - Untitled UI Style */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-brand-50 ring-1 ring-inset ring-brand-600/20 mb-6 sm:mb-8">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-brand-700">AI-Powered Meme Creation</span>
            </div>
            
            {/* Headline - Untitled UI Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-4 sm:mb-6 px-4">
              Create <span className="text-brand-600 dark:text-brand-400">Epic Memes</span>
              <br />
              in Seconds
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
              The most customizable and fastest meme generator. Choose from thousands of templates and let AI help you craft viral content.
            </p>
            
            {/* CTA Buttons - Untitled UI Button Style */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10 sm:mb-12 px-4">
              <button
                onClick={() => {
                  const element = document.getElementById('templates-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                Start for Free
              </button>
              <button
                onClick={() => router.push('/gallery')}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-base font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border-2 border-gray-300 dark:border-gray-700"
              >
                View Gallery
              </button>
            </div>
            
            {/* Stats - Untitled UI Style */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-8 sm:gap-12 lg:gap-16 text-center px-4">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{templates.length}+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Templates</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">AI</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Powered</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Free</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Forever</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">∞</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section - Untitled UI Style */}
      <section id="templates-section" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Untitled UI Typography */}
          <div className="text-center mb-12 sm:mb-16 animate-slideUp">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meme templates for all creators
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse through our vast collection of templates and find the perfect one for your next viral meme
            </p>
          </div>

          {/* Category Filters - Untitled UI Style */}
          <div className="flex flex-wrap gap-2 justify-center mb-10 sm:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category === 'all' ? undefined : category)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${(category === 'all' && !selectedCategory) || selectedCategory === category
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700'
                  }
                `.trim()}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {/* Loading State - Untitled UI Style */}
          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 dark:border-gray-700 border-t-brand-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-base font-medium">Loading templates...</p>
            </div>
          )}

          {/* Error State - Untitled UI Style */}
          {error && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-error-100 dark:bg-error-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-error-600 dark:text-error-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Error</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-error-600 dark:text-error-400 text-base font-medium mb-6">{error}</p>
              <button
                type="button"
                onClick={() => fetchTemplates()}
                className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 shadow-sm"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Templates Grid */}
          {!error && templates.length > 0 && (
            <div className="animate-fadeIn">
              <TemplateGrid
                templates={templates}
                onSelectTemplate={handleSelectTemplate}
                selectedCategory={selectedCategory}
              />

              {/* Load More Button */}
              <div className="text-center py-10">
                {hasMore && !loading && (
                  <button
                    type="button"
                    onClick={loadMoreTemplates}
                    className="px-6 py-3 rounded-lg text-sm font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Load More Templates
                  </button>
                )}

                {loading && templates.length > 0 && (
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Loading more templates...</p>
                  </div>
                )}

                {!loading && !hasMore && (
                  <p className="text-gray-500 dark:text-gray-400">You've reached the end!</p>
                )}
              </div>
            </div>
          )}

          {/* Initial Loading State */}
          {loading && templates.length === 0 && !error && (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-2 text-gray-500 dark:text-gray-400">Loading templates...</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA - Untitled UI Style */}
      <section className="bg-gray-900 dark:bg-gray-900 py-16 sm:py-24 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to create viral memes?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Join thousands of creators using MemeForge to create engaging content
          </p>
          <button
            onClick={() => {
              const element = document.getElementById('templates-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            type="button"
            className="px-6 py-3 rounded-lg text-base font-semibold bg-brand-600 text-white hover:bg-brand-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Get Started for Free
          </button>
          <p className="text-gray-400 text-sm mt-4">No credit card required • Free forever</p>
        </div>
      </section>
    </div>
  );
}
