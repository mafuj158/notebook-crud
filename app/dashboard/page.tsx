"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiEdit,
  FiTrash2,
  FiArrowRight,
  FiCalendar,
} from "react-icons/fi";

const INITIAL_NOTES = [
  {
    id: "1",
    title: "RESOLVE HYDRATION MISMATCHES IN LAYOUTS",
    date: "JUN 16, 2026",
    content:
      "Avoid layouts rendering mismatched markup by checking window state before calling browser storage APIs. Maintain client-server HTML parity by...",
    tags: [{ label: "FRONTEND", color: "bg-[#00e5ff] text-black" }],
  },
  {
    id: "2",
    title: "PREVENT HOT RELOAD CLIENT EXHAUSTION",
    date: "JUN 15, 2026",
    content:
      "Cache the instantiated PrismaClient on globalThis. Prevents development server from spawning duplicate connection pools during hot reloads when saving...",
    tags: [
      { label: "PRISMA", color: "bg-[#22c55e] text-black" },
      { label: "PERFORMANCE", color: "bg-[#f97316] text-black" },
    ],
  },
  {
    id: "3",
    title: "RUN INITIAL SCHEMA MIGRATION",
    date: "JUN 10, 2026",
    content:
      "Execute prisma migrate dev to generate initial SQL migrations. Verify output files inside the migrations directory before pushing schema changes to productio...",
    tags: [
      { label: "MIGRATION", color: "bg-[#f43f5e] text-white" },
      { label: "DATABASE", color: "bg-[#facc15] text-black" },
    ],
  },
  {
    id: "4",
    title: "CONFIGURE PRISMA ORM WITH POSTGRESQL",
    date: "JUN 1, 2026",
    content:
      "Setup local PostgreSQL container and configure DATABASE_URL in the environment file. Initialize schema with Prisma schema command. Verify port...",
    tags: [
      { label: "PRISMA", color: "bg-[#22c55e] text-black" },
      { label: "DATABASE", color: "bg-[#facc15] text-black" },
    ],
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = INITIAL_NOTES.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* TOP SEARCH BAR */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <FiSearch className="text-2xl text-black stroke-[3]" />
        </div>
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border-[3px] border-black pl-12 pr-4 py-3.5 font-bold text-base shadow-[4px_4px_0px_#000] focus:outline-none placeholder:text-zinc-500 placeholder:font-medium"
        />
      </div>

      {/* NOTES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white border-[3px] border-black p-5 shadow-[5px_5px_0px_#000] flex flex-col justify-between hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[3px_3px_0px_#000] transition-all"
          >
            <div>
              <h2 className="font-black text-lg leading-tight uppercase tracking-tight line-clamp-2 min-h-12">
                {note.title}
              </h2>

              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 mt-2 mb-3">
                <FiCalendar className="text-sm" />
                <span>{note.date}</span>
              </div>

              <p className="text-xs font-medium text-zinc-700 leading-relaxed line-clamp-4 mb-4">
                {note.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {note.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] font-black uppercase px-2.5 py-1 border-[2px] border-black shadow-[2px_2px_0px_#000] ${t.color}`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-3 border-t-[2px] border-zinc-200">
              <Link
                href={`/dashboard/${note.id}`}
                className="flex-1 bg-white border-[2px] border-black py-1.5 px-2 font-black text-xs flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] hover:bg-zinc-100 cursor-pointer text-center"
              >
                <span>VIEW</span>
                <FiArrowRight className="text-sm stroke-[3]" />
              </Link>

              <button className="bg-[#facc15] border-[2px] border-black py-1.5 px-3 font-black text-xs flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] hover:bg-[#eab308] cursor-pointer">
                <FiEdit className="text-xs" />
                <span>EDIT</span>
              </button>

              <button className="bg-[#fb7185] border-[2px] border-black py-1.5 px-3 font-black text-xs flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000] hover:bg-[#f43f5e] hover:text-white cursor-pointer">
                <FiTrash2 className="text-xs" />
                <span>DELETE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
