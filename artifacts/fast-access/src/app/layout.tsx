import type { Metadata } from 'next';
import { Atkinson_Hyperlegible, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-atkinson',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FastAccess — Stadium Navigation Companion',
  description:
    'Accessible stadium navigation for fans with wheelchair/limited mobility, low vision, deaf/hard-of-hearing, and sensory sensitivity needs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${atkinson.variable} ${ibmMono.variable}`}>
      <body className="bg-fa-bg text-fa-ink font-sans antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
