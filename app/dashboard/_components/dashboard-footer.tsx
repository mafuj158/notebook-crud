import React from "react";
import Link from "next/link";
import { FiBookOpen, FiExternalLink } from "react-icons/fi";

export default function DashboardFooter() {
  return (
    <footer className="w-full bg-white border-t-[3px] border-black mt-auto">
      <div className="container px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-700">
        {/* BRAND & COPYRIGHT */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="border-2 border-black px-2 py-0.5 bg-white font-black text-xs shadow-[1.5px_1.5px_0px_#000] flex items-center gap-1">
              <FiBookOpen className="text-xs" />
              LWS
            </span>
            <span className="bg-[#facc15] border-2 border-black px-2 py-0.5 font-black text-xs shadow-[1.5px_1.5px_0px_#000]">
              NOTEBOOK
            </span>
          </div>
          <span className="text-[11px] text-zinc-500 font-semibold sm:ml-2">
            © 2026 LEARN WITH SUMIT. ALL RIGHTS RESERVED.
          </span>
        </div>

        {/* STATUS & LINKS */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs uppercase font-black">
          <div className="flex items-center gap-2 bg-[#22c55e]/15 border-[1.5px] border-black px-2.5 py-1 text-[11px] shadow-[1.5px_1.5px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] border border-black inline-block animate-pulse" />
            <span className="tracking-wider">SYSTEM ACTIVE</span>
          </div>

          <Link
            href="/dashboard"
            className="hover:text-black hover:underline underline-offset-4"
          >
            NOTES
          </Link>

          <Link
            href="/dashboard/create-note"
            className="hover:text-black hover:underline underline-offset-4"
          >
            CREATE NOTE
          </Link>

          <a
            href="https://learnwithsumit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black hover:underline underline-offset-4 flex items-center gap-1"
          >
            <span>LWS PLATFORM</span>
            <FiExternalLink className="text-[11px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
