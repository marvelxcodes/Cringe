'use client';

import { useRouter, usePathname } from 'next/navigation';
import Button from './ui/button';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Templates', path: '/' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-gray-900/95 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Untitled UI Style */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 group"
            type="button"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
              <span className="text-xl">😂</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
              MemeForge
            </span>
          </button>

          {/* Navigation Links - Untitled UI Style */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                type="button"
                className={`
                  px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === item.path
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }
                `.trim()}
              >
                {item.name}
              </button>
            ))}
            <ThemeToggle />
            <Button
              onPress={() => router.push('/generate')}
              variant="primary"
              size="md"
              className="ml-2"
            >
              <span className="hidden sm:inline">Get Started</span>
              <span className="sm:hidden">Start</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

