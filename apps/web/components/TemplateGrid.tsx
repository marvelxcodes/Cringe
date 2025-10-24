'use client';

import { useState } from 'react';
import type { Template, TemplateGridProps } from '@/types';
import Card from './ui/card';
import Badge from './ui/badge';
import Button from './ui/button';

export default function TemplateGrid({ templates, onSelectTemplate, selectedCategory }: TemplateGridProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      {/* Search Bar - Untitled UI Style */}
      <div className="mb-8 animate-slideDown">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Search</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full pl-11 pr-4 py-3 rounded-lg 
              bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
              text-gray-900 dark:text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
              shadow-sm transition-all duration-200
            "
          />
        </div>
      </div>

      {/* Templates Grid - Untitled UI Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template, index) => (
          <Card
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            padding="none"
            variant="default"
            hoverable
            className="cursor-pointer animate-fadeIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-xl">
              <img
                src={template.image_url}
                alt={template.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  className="bg-brand-600 text-white hover:bg-brand-700 shadow-lg"
                >
                  Use Template
                </Button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-gray-900 dark:text-white font-semibold text-base mb-2 line-clamp-1">
                {template.name}
              </h3>
              <Badge variant="brand" size="sm">
                {template.category}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State - Untitled UI Style */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-20 animate-fadeIn">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <title>Empty</title>
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h3 className="text-gray-900 dark:text-white text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}

