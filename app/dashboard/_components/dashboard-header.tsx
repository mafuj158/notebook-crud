"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBookOpen, FiUser, FiLogOut, FiPlus } from "react-icons/fi";
import api from "@/lib/axios";
import { useUser } from "@/hooks/user.hook";

export default function DashboardHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const { user } = useUser();

  const userName = user?.data?.user?.name || "Sumit Saha";
  const userEmail = user?.data?.user?.email || "sumit@learnwithsumit.com";

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setLoggingOut(false);
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <header className="w-full  flex items-center justify-between bg-white border-b border-black  h-18 min-h-18 sticky top-0 z-30 shadow-[0px_2px_0px_#000]">
      <div className="container flex items-center justify-between">
        {/* BRAND LOGO */}
        <Link href="/" prefetch={true} className="flex items-center gap-2 hover:opacity-90 shrink-0">
          <div className="flex items-center gap-1.5 border-[2.5px] border-black px-2.5 py-1 bg-white font-black text-lg sm:text-xl shadow-[2px_2px_0px_#000]">
            <FiBookOpen className="text-lg sm:text-xl" />
            <span>LWS</span>
          </div>
          <div className="bg-[#facc15] border-[2.5px] border-black px-3 py-1 font-black text-lg sm:text-xl shadow-[2px_2px_0px_#000]">
            NOTEBOOK
          </div>
        </Link>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* NEW NOTE BUTTON */}
          <Link
            href="/dashboard/create-note"
            prefetch={true}
            className="h-11 bg-[#22c55e] border-[2px] border-black px-3.5 sm:px-4 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <FiPlus className="text-base sm:text-lg stroke-[3]" />
            <span className="hidden sm:inline">NEW NOTE</span>
          </Link>

          {/* USER IDENTITY BADGE */}
          <div className="h-11 bg-[#00e5ff] border-[2px] border-black px-3 sm:px-3.5 shadow-[2px_2px_0px_#000] flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white border-[1.5px] border-black flex items-center justify-center font-black text-sm shrink-0">
              <FiUser className="text-sm sm:text-base text-black" />
            </div>
            <div className="flex flex-col text-left justify-center">
              <span className="font-black text-xs sm:text-sm leading-tight truncate max-w-[100px] sm:max-w-[160px]">
                {userName}
              </span>
              <span className="text-[10px] sm:text-[11px] text-zinc-900 font-medium leading-tight truncate max-w-[100px] sm:max-w-[160px]">
                {userEmail}
              </span>
            </div>
          </div>

          {/* LOGOUT BUTTON */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            title="Logout"
            className="h-11 bg-[#fb7185] border-[2px] border-black px-3 sm:px-4 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#f43f5e] hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiLogOut className="text-base stroke-[2.5]" />
            <span className="hidden md:inline">
              {loggingOut ? "LOGGING OUT..." : "LOGOUT"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
