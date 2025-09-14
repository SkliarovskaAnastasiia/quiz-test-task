'use client';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Box, CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Box
        sx={{
          width: '100%',
          maxWidth: 1024,
          height: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3 },
        }}
      >
        {children}
      </Box>
    </QueryClientProvider>
  );
}
