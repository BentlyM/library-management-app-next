'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function RootProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
        {children}
    </QueryClientProvider>
  );
}

export default RootProviders;
