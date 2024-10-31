import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI SDK - Next.js OpenAI Examples',
  description: 'Examples of using the AI SDK with Next.js and OpenAI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        "relative min-h-screen"
      )}>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#447099]/50 to-[#EE6331]/50" />
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
