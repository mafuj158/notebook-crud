import Link from "next/link";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-4">
      {/* Register Card */}
      <div className="w-full max-w-md bg-white border-[3.5px] border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        <h1 className="font-black text-2xl uppercase tracking-tight mb-2">REGISTER</h1>
        <p className="text-xs font-bold text-zinc-600 uppercase mb-6">
          Create an account to start writing notes
        </p>

        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-black uppercase mb-1">Full Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-zinc-600" />
              <input
                type="text"
                placeholder="Sumit Saha"
                className="w-full border-[2px] border-black pl-9 pr-3 py-2 font-bold text-sm shadow-[2px_2px_0px_#000] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-zinc-600" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full border-[2px] border-black pl-9 pr-3 py-2 font-bold text-sm shadow-[2px_2px_0px_#000] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-zinc-600" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border-[2px] border-black pl-9 pr-3 py-2 font-bold text-sm shadow-[2px_2px_0px_#000] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#22c55e] border-[2.5px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 mt-2 cursor-pointer transition-all"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <div className="mt-6 pt-4 border-t-[2px] border-zinc-200 text-center text-xs font-bold">
          <span>Already have an account? </span>
          <Link href="/login" className="underline font-black text-black hover:text-zinc-700">
            LOGIN HERE
          </Link>
        </div>
      </div>
    </div>
  );
}
