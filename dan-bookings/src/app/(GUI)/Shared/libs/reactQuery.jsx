'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider,HydrationBoundary,dehydrate } from '@tanstack/react-query'

export function ReactQueryProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
          {children}
    </QueryClientProvider>
  )
}