"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut } from "react-icons/fi";
import api from "@/lib/axios";

interface DashboardHeaderProps {
  userName?: string;
  userEmail?: string;
}

export default function DashboardHeader({
  userName = "Sumit Saha",
  userEmail = "sumit@learnwithsumit.com",
}: DashboardHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

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
    <div className="flex items-center gap-3">
      {/* USER IDENTITY BADGE (Exact same height: h-11 / 44px) */}
      <div className="h-11 bg-[#00e5ff] border-[2px] border-black px-3.5 shadow-[2px_2px_0px_#000] flex items-center gap-2.5">
        <div className="w-7 h-7 bg-white border-[1.5px] border-black flex items-center justify-center font-black text-sm shrink-0">
          <FiUser className="text-base text-black" />
        </div>
        <div className="flex flex-col text-left justify-center">
          <span className="font-black text-xs sm:text-sm leading-tight">
            {userName}
          </span>
          <span className="text-[10px] text-zinc-900 font-medium leading-tight">
            {userEmail}
          </span>
        </div>
      </div>

      {/* LOGOUT BUTTON (Exact same height: h-11 / 44px) */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        title="Logout"
        className="h-11 bg-[#fb7185] border-[2px] border-black px-4 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#f43f5e] hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FiLogOut className="text-base stroke-[2.5]" />
        <span>{loggingOut ? "LOGGING OUT..." : "LOGOUT"}</span>
      </button>
    </div>
  );
}
