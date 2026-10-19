import React from "react";
import { FiBookOpen } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-4 font-mono antialiased">
      <div className="bg-white border-[3px] border-black p-6 sm:p-8 shadow-[6px_6px_0px_#000] flex flex-col items-center gap-4 max-w-sm w-full text-center">
        {/* Animated Icon Box */}
        <div className="w-16 h-16 bg-[#facc15] border-[2.5px] border-black shadow-[3px_3px_0px_#000] flex items-center justify-center animate-bounce">
          <FiBookOpen className="text-3xl text-black" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <div className="font-black text-xl tracking-tight uppercase">
            NOTEBOOK
          </div>
          <div className="text-xs font-bold text-zinc-600 tracking-wider">
            PREPARING CONTENT...
          </div>
        </div>

        {/* Neobrutalist Progress Bar */}
        <div className="w-full bg-zinc-100 border-[2px] border-black h-4 p-0.5 overflow-hidden shadow-[2px_2px_0px_#000]">
          <div className="bg-[#22c55e] h-full w-full animate-[pulse_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
