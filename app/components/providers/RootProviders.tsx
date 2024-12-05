'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DrawerProvider } from './DrawerProvider';
import { Toaster } from 'react-hot-toast';
import { EmotionCache } from '@emotion/react';
import AppThemeProvider from './ThemeProvider';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
interface RootProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

function RootProviders({ children }: RootProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: false }}>
        <AppThemeProvider>
          <InitColorSchemeScript attribute="class" />
          <QueryClientProvider client={queryClient}>
            <Toaster toastOptions={{
              style: {
                backgroundColor: 'inherit',
                color: 'inherit'
              }
            }}/>
            <ReactQueryDevtools />
            <DrawerProvider>{children}</DrawerProvider>
          </QueryClientProvider>
        </AppThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
}

export default RootProviders;
