'use client';

import { useState } from 'react';
import type { PromptInputProps } from '@/types';
import Button from './ui/button';

export default function PromptInput({ 
  onSubmit, 
  isLoading = false, 
  placeholder = 'Describe your meme idea...' 
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('');
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-slideUp">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading}
          maxLength={maxLength}
          rows={4}
          className="
            w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
            resize-none disabled:opacity-50 disabled:cursor-not-allowed 
            shadow-sm transition-all duration-200 text-base
          "
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/80 px-1.5 py-0.5 rounded">
          {prompt.length}/{maxLength}
        </div>
      </div>

      <Button
        type="submit"
        isDisabled={!prompt.trim() || isLoading}
        variant="primary"
        size="lg"
        fullWidth
        className="mt-4 font-semibold"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <title>Loading</title>
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4" 
                fill="none" 
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
              />
            </svg>
            AI is thinking...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Generate with AI
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Generate</title>
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
          </span>
        )}
      </Button>
    </form>
  );
}

