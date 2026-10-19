'use client'

import { useUser } from "@/hooks/user.hook";
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

export default function Header() {

  // hook 
  const { user, isLoading } = useUser();


  return (
    <header className="w-full bg-white border-b-[3px] border-black fixed z-999">
      <div className="container py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <div className="flex items-center gap-2 bg-[#facc15] border-[2.5px] border-black px-3.5 py-1.5 font-black text-xl shadow-[2px_2px_0px_#000]">
            <FiBookOpen className="text-xl stroke-[2.5]" />
            <span>NOTEBOOK</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3">
          {
            isLoading && (
              <div className="border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] bg-white hover:bg-zinc-100 transition-all">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-black"></div>
              </div>
            )
          }

          {
            user && !isLoading && (
              <Link
                href="/dashboard"
                prefetch={true}
                className="hidden sm:inline-block border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] bg-white hover:bg-zinc-100 transition-all"
              >
                DASHBOARD
              </Link>
            )
          }
          {
            !user && !isLoading && (
              <>
                <Link
                  href="/login"
                  prefetch={true}
                  className="bg-white border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-zinc-100 transition-all"
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  prefetch={true}
                  className="bg-[#facc15] border-2 border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#eab308] transition-all"
                >
                  REGISTER
                </Link>
              </>
            )
          }
        </nav>
      </div>
    </header>
  );
}
