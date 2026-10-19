import React from "react";
import Link from "next/link";
import { FiBookOpen, FiPlus } from "react-icons/fi";
import DashboardHeader from "@/components/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-black font-mono antialiased flex flex-col">
      {/* TOP HEADER: SINGLE UNBROKEN BORDER-B ACROSS ENTIRE VIEWPORT */}
      <header className="w-full bg-white border-b-[3px] border-black flex flex-col md:flex-row sticky top-0 z-30 shadow-[0px_2px_0px_#000]">
        {/* TOP-LEFT: LOGO BOX (w-80 matching sidebar exactly) */}
        <div className="w-full md:w-80 h-[72px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-black px-5 flex items-center shrink-0">
          <Link href="/" prefetch={true} className="flex items-center gap-2 hover:opacity-90">
            <div className="flex items-center gap-1.5 border-[2.5px] border-black px-2.5 py-1 bg-white font-black text-xl shadow-[2px_2px_0px_#000]">
              <FiBookOpen className="text-xl" />
              <span>LWS</span>
            </div>
            <div className="bg-[#facc15] border-[2.5px] border-black px-3 py-1 font-black text-xl shadow-[2px_2px_0px_#000]">
              NOTEBOOK
            </div>
          </Link>
        </div>

        {/* TOP-RIGHT: USER INFO & LOGOUT (Equal height h-[72px]) */}
        <div className="flex-1 h-[72px] px-4 sm:px-6 flex items-center justify-end min-w-0">
          <DashboardHeader />
        </div>
      </header>

      {/* BOTTOM ROW: SIDEBAR + MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* LEFT SIDEBAR (w-80 matching logo box above) */}
        <aside className="w-full md:w-80 bg-white border-b-[3px] md:border-b-0 md:border-r-[3px] border-black p-5 flex flex-col gap-6 shrink-0">
          {/* NEW NOTE BUTTON */}
          <Link
            href="/dashboard/create-note"
            prefetch={true}
            className="w-full bg-[#22c55e] border-[2.5px] border-black py-3 px-4 font-black text-lg flex items-center justify-center gap-2 shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer text-center"
          >
            <FiPlus className="text-2xl stroke-[3]" />
            <span>NEW NOTE</span>
          </Link>

          {/* FILTER BY TAG */}
          <div className="flex flex-col gap-2.5">
            <div className="text-xs font-black tracking-wider text-zinc-600 uppercase">
              # FILTER BY TAG
            </div>

            <Link
              href="/dashboard"
              prefetch={true}
              className="w-full flex items-center justify-between px-3.5 py-2.5 border-[2px] border-black font-bold text-sm shadow-[2px_2px_0px_#000] cursor-pointer transition-all bg-black text-white"
            >
              <span className="flex items-center gap-2">
                <FiBookOpen className="text-base" /> All Notes
              </span>
              <span className="px-2 py-0.5 text-xs font-black border-[1.5px] border-black bg-zinc-800 text-white">
                4
              </span>
            </Link>

            {[
              { name: "Database", count: 2 },
              { name: "Prisma", count: 2 },
              { name: "Migration", count: 1 },
              { name: "Frontend", count: 1 },
              { name: "Performance", count: 1 },
            ].map((tag) => (
              <Link
                key={tag.name}
                href={`/dashboard?tag=${tag.name.toLowerCase()}`}
                prefetch={true}
                className="w-full flex items-center justify-between px-3.5 py-2 border-[2px] border-black font-bold text-sm shadow-[2px_2px_0px_#000] cursor-pointer transition-all bg-white text-black hover:bg-zinc-50"
              >
                <span># {tag.name}</span>
                <span className="px-2 py-0.5 text-xs font-black border-[1.5px] border-black bg-zinc-100 text-black">
                  {tag.count}
                </span>
              </Link>
            ))}
          </div>
        </aside>

        {/* RIGHT MAIN VIEW AREA */}
        <main className="flex-1 p-6 md:p-8 flex flex-col gap-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
