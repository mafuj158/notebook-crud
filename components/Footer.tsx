import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-[3px] border-black">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-zinc-600">
        <div className="flex items-center gap-2">
          <div className="border-2 border-black px-2 py-0.5 bg-white font-black text-sm shadow-[1.5px_1.5px_0px_#000]">
            LWS
          </div>
          <div className="bg-[#facc15] border-2 border-black px-2 py-0.5 font-black text-sm shadow-[1.5px_1.5px_0px_#000]">
            NOTEBOOK
          </div>
          <span className="ml-2">© 2026. ALL RIGHTS RESERVED.</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-black">
            HOME
          </Link>
          <Link href="/dashboard" className="hover:text-black">
            DASHBOARD
          </Link>
          <Link href="/login" className="hover:text-black">
            LOGIN
          </Link>
          <Link href="/register" className="hover:text-black">
            REGISTER
          </Link>
        </div>
      </div>
    </footer>
  );
}
