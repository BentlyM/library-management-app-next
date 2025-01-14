'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DrawerProvider } from './DrawerProvider';
import { Toaster } from 'react-hot-toast';
import { EmotionCache } from '@emotion/react';
import { useColorScheme } from '@mui/material';
interface RootProviderProps {
  emotionCache?: EmotionCache;
  children: React.ReactNode;
}

function RootProviders({ children }: RootProviderProps) {
  const [queryClient] = React.useState(() => new QueryClient({}));
  const { mode, systemMode } = useColorScheme();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster
          toastOptions={{
            style: {
              backgroundColor:
                mode == 'dark' || systemMode == 'dark' ? '#121212' : '#ffff',
              color: 'inherit',
            },
          }}
        />
        <ReactQueryDevtools />
        <DrawerProvider>{children}</DrawerProvider>
      </QueryClientProvider>
    </>
  );
}

export default RootProviders;
