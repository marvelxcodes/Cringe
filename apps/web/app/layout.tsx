import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';

export const metadata: Metadata = {
  title: 'AI Meme Generator - Create Custom Memes with AI',
  description: 'Generate and customize memes using AI-powered templates and Fabric.js editor',
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									const theme = localStorage.getItem('theme') || 
										(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
									if (theme === 'dark') {
										document.documentElement.classList.add('dark');
									} else {
										document.documentElement.classList.remove('dark');
									}
								} catch (e) {}
							})();
						`,
					}}
				/>
			</head>
			<body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
