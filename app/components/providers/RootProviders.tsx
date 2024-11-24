'use client'

import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DrawerProvider } from './DrawerProvider';
import { Toaster } from 'react-hot-toast';
import MUIThemeProvider from './ThemeProvider';
import createEmotionCache from '@/app/lib/createEmotionCache';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

interface RootProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

function RootProviders({
  children,
  emotionCache = clientSideEmotionCache,
}: RootProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));
  const [isThemeReady, setIsThemeReady] = useState(false);

  // When the theme has been resolved, we set the state to true
  useEffect(() => {
    setIsThemeReady(true);
  }, []);

  return (
    <PreferredThemeProvider
      enableSystem={true}
      enableColorScheme={true}
    >
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          {/* Only render once the theme is ready */}
          {isThemeReady ? (
            <>
              <Toaster />
              <ReactQueryDevtools />
              <MUIThemeProvider>
                <DrawerProvider>{children}</DrawerProvider>
              </MUIThemeProvider>
            </>
          ) : (
            // You can render an empty fragment or minimal styles in the meantime
            <div style={{ visibility: 'hidden' }}></div>
          )}
        </QueryClientProvider>
      </CacheProvider>
    </PreferredThemeProvider>
  );
}

export default RootProviders;
