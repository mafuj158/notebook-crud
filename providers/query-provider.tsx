"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // ১ মিনিট পর্যন্ত ক্যাশ থাকবে
            refetchOnWindowFocus: false, // উইন্ডো ফোকাস করলে অপ্রয়োজনীয় রিফেচ বন্ধ
            retry: 1, // এরর হলে ১ বার রিট্রাই করবে
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
