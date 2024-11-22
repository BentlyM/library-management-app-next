'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DrawerProvider } from './DrawerProvider';
import { Toaster } from 'react-hot-toast';
import MUIThemeProvider from './ThemeProvider';
import createEmotionCache from '@/app/lib/createEmotionCache';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

interface rootProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

function RootProviders({
  children,
  emotionCache = clientSideEmotionCache,
}: rootProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));

  return (
    <PreferredThemeProvider>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <ReactQueryDevtools />
          <MUIThemeProvider>
            <DrawerProvider>{children}</DrawerProvider>
          </MUIThemeProvider>
        </QueryClientProvider>
      </CacheProvider>
    </PreferredThemeProvider>
  );
}

export default RootProviders;
