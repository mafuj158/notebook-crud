import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Note Details</h1>
          <p className="text-xs font-bold text-zinc-600 uppercase mb-4">Note ID: {id}</p>
          <div className="bg-zinc-50 border-[2px] border-black p-4 text-sm font-medium">
            Placeholder for note details content.
          </div>
        </div>
      </div>
    </div>
  );
}
