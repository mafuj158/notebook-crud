import React from "react";
import DashboardHeader from "./_components/dashboard-header";
import DashboardFooter from "./_components/dashboard-footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}

