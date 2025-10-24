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
		<html lang='en'>
			<body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50 transition-colors duration-200">
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
