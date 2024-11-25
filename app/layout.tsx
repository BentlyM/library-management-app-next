import type { Metadata } from 'next';
import './globals.css';
import RootProviders from './components/providers/RootProviders';

export const metadata: Metadata = {
  title: 'Library App',
  description: 'Library',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
