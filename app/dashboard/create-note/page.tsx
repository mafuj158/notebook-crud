import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function CreateNotePage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] p-6 md:p-10 font-mono text-black">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 border-[2px] border-black bg-white px-3 py-1.5 font-bold text-xs uppercase shadow-[2px_2px_0px_#000] mb-6 hover:bg-zinc-100"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>
        <div className="bg-white border-[3.5px] border-black p-6 shadow-[6px_6px_0px_#000]">
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Create Note</h1>
          <p className="text-xs font-bold text-zinc-600 uppercase mb-6">
            Write your note title, tags, and content
          </p>
          {/* Skeleton placeholder form */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-black uppercase mb-1">Title</label>
              <input
                type="text"
                placeholder="Note title..."
                className="w-full border-[2px] border-black p-2 font-bold text-sm shadow-[2px_2px_0px_#000]"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Tags</label>
              <input
                type="text"
                placeholder="FRONTEND, PRISMA, DATABASE..."
                className="w-full border-[2px] border-black p-2 font-bold text-sm shadow-[2px_2px_0px_#000]"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase mb-1">Content</label>
              <textarea
                rows={5}
                placeholder="Note content..."
                className="w-full border-[2px] border-black p-2 font-medium text-sm shadow-[2px_2px_0px_#000]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#22c55e] border-[2px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000]"
            >
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
