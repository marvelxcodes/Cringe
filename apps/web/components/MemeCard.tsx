'use client';

import type { MemeCardProps } from '@/types';
import Card from './ui/card';
import Badge from './ui/badge';

export default function MemeCard({ meme, onClick }: MemeCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(meme);
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      role="button"
      tabIndex={0}
      padding="none"
      variant="default"
      hoverable
      className="group cursor-pointer animate-fadeIn"
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-xl">
        <img
          src={meme.image_url}
          alt={meme.prompt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <p className="text-white text-sm line-clamp-3 font-medium">{meme.prompt}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-3 leading-relaxed">{meme.prompt}</p>
        <div className="flex items-center justify-between">
          <Badge variant="gray" size="sm">
            {new Date(meme.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </Badge>
          <span className="text-brand-600 dark:text-brand-400 text-sm font-medium group-hover:text-brand-700 dark:group-hover:text-brand-300 flex items-center gap-1">
            View
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Card>
  );
}
