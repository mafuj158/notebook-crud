import React from "react";
import DashboardHeader from "./_components/dashboard-header";
import DashboardFooter from "./_components/dashboard-footer";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axiosPrivateServer from "@/lib/axios-server";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // 1️⃣ Create query client
  const queryClient = new QueryClient();
  const axiosInstance = await axiosPrivateServer();
  try {
    await queryClient.query({
      queryKey: ["user"],
      queryFn: () => userService(axiosInstance),
      staleTime: 60 * 1000,
    });
  } catch (error) {
    // swallow error to avoid crashing layout
  }
  // 4️⃣ Dehydrate AFTER prefetch
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen bg-[#fafaf9] text-black font-mono antialiased flex flex-col">
        {/* FULL-WIDTH TOP HEADER */}
        <DashboardHeader />

        {/* MAIN CONTAINER */}
        <main className="container my-16 flex-1 flex flex-col gap-8">
          {children}
        </main>

        {/* DASHBOARD FOOTER */}
        <DashboardFooter />
      </div>
    </HydrationBoundary>

  );
}

