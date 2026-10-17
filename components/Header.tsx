import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

export default function Header() {
  return (
    <header className="w-full bg-white border-b-[3px] border-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-90">
          <div className="flex items-center gap-1.5 border-[2.5px] border-black px-2.5 py-1 bg-white font-black text-xl shadow-[2px_2px_0px_#000]">
            <FiBookOpen className="text-xl" />
            <span>LWS</span>
          </div>
          <div className="bg-[#facc15] border-[2.5px] border-black px-3 py-1 font-black text-xl shadow-[2px_2px_0px_#000]">
            NOTEBOOK
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-3">
          <Link
            href="/dashboard"
            prefetch={true}
            className="hidden sm:inline-block border-[2px] border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] bg-white hover:bg-zinc-100 transition-all"
          >
            DASHBOARD
          </Link>
          <Link
            href="/login"
            prefetch={true}
            className="bg-white border-[2px] border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-zinc-100 transition-all"
          >
            LOGIN
          </Link>
          <Link
            href="/register"
            prefetch={true}
            className="bg-[#facc15] border-[2px] border-black px-4 py-2 font-black text-xs uppercase shadow-[2px_2px_0px_#000] hover:bg-[#eab308] transition-all"
          >
            REGISTER
          </Link>
        </nav>
      </div>
    </header>
  );
}
