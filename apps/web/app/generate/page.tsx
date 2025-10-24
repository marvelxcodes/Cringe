'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import FabricEditor from '@/components/FabricEditor';
import PromptInput from '@/components/PromptInput';
import type { Template } from 'types';

export default function GeneratePage() {
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [prompt, setPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    const storedTemplate = sessionStorage.getItem('selectedTemplate');
    if (storedTemplate) {
      const parsedTemplate = JSON.parse(storedTemplate) as Template;
      setTemplate(parsedTemplate);
      setImageUrl(parsedTemplate.image_url);
    } else {
      router.push('/');
    }
  }, [router]);

  const handleGenerateMeme = async (userPrompt: string) => {
    if (!template) return;

    setIsGenerating(true);
    setPrompt(userPrompt);

    try {
      const response = await fetch('/api/generate-meme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userPrompt,
          templateUrl: template.image_url,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();

      if (data.success) {
        setGeneratedText(data.generatedText);
        setImageUrl(data.imageUrl);
        setShowEditor(true);
      } else {
        alert(data.error || 'Failed to generate meme');
      }
    } catch (error) {
      console.error('Error generating meme:', error);
      alert('An error occurred while generating the meme');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveMeme = async (imageBlob: Blob) => {
    if (!template || !prompt) return;

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append('image', imageBlob);
      formData.append('prompt', prompt);
      formData.append('templateId', template.id);

      const response = await fetch('/api/save-meme', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();

      if (data.success) {
        alert('Meme saved successfully!');
        router.push('/gallery');
      } else {
        alert(data.error || 'Failed to save meme');
      }
    } catch (error) {
      console.error('Error saving meme:', error);
      alert('An error occurred while saving the meme');
    } finally {
      setIsSaving(false);
    }
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-200 dark:border-brand-800 border-t-brand-600 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-200">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors duration-200 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Back Arrow</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Templates
          </button>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Create Your Meme</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Template: <span className="font-semibold text-gray-900 dark:text-white">{template.name}</span>
            <span className="mx-2">•</span>
            <span className="capitalize text-xs sm:text-sm px-2 sm:px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300">
              {template.category}
            </span>
          </p>
        </div>

        {/* Prompt Input or Editor */}
        {!showEditor ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6 sm:mb-8 animate-slideUp">
              <div className="mb-6 sm:mb-8 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  What's your meme about?
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  Describe your idea and let AI generate the perfect text for your meme
                </p>
              </div>

              <div className="mb-6 sm:mb-8">
                <img
                  src={template.image_url}
                  alt={template.name}
                  className="w-full max-w-md mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-800"
                />
              </div>

              <PromptInput
                onSubmit={handleGenerateMeme}
                isLoading={isGenerating}
                placeholder="Example: Make this about procrastination and coffee addiction"
              />

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditor(true);
                    setPrompt('Direct edit');
                  }}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
                >
                  Skip AI and edit manually →
                </button>
              </div>
            </div>

            {generatedText && (
              <div className="bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl p-4 sm:p-6 animate-fadeIn">
                <div className="flex items-start">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">✨</span>
                  <div>
                    <p className="font-semibold text-success-900 dark:text-success-100 mb-2 text-sm sm:text-base">AI Suggestion</p>
                    <p className="text-success-800 dark:text-success-300 text-sm sm:text-base">{generatedText}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-slideUp">
            {generatedText && (
              <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-start">
                  <span className="text-xl sm:text-2xl mr-2 sm:mr-3">🤖</span>
                  <div>
                    <p className="font-semibold text-brand-900 dark:text-brand-100 mb-2 text-sm sm:text-base">AI Generated Text</p>
                    <p className="text-brand-800 dark:text-brand-300 text-sm sm:text-base">{generatedText}</p>
                    <p className="text-brand-600 dark:text-brand-400 text-xs sm:text-sm mt-2">
                      You can add this text or create your own using the editor below
                    </p>
                  </div>
                </div>
              </div>
            )}

            <FabricEditor
              initialImageUrl={imageUrl}
              onSave={isSaving ? undefined : handleSaveMeme}
            />

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <title>Back Arrow</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to prompt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
