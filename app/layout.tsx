import type { Metadata } from 'next';
import './globals.css';
import RootProviders from './components/providers/RootProviders';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import AppThemeProvider from './components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Library App',
  description: 'Library',
};

export const fetchCache = "force-no-store";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: false }}>
          <AppThemeProvider>
            <InitColorSchemeScript attribute="class" />
            <RootProviders>{children}</RootProviders>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
