import Link from "next/link";
import LoginForm from "./_components/form";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white border-[3.5px] border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        <h1 className="font-black text-2xl uppercase tracking-tight mb-2">LOGIN</h1>
        <p className="text-xs font-bold text-zinc-600 uppercase mb-6">
          Access your notes and dashboard
        </p>

        <LoginForm />

        <div className="mt-6 pt-4 border-t-2 border-zinc-200 text-center text-xs font-bold">
          <span>Don&apos;t have an account? </span>
          <Link href="/register" className="underline font-black text-black hover:text-zinc-700">
            REGISTER HERE
          </Link>
        </div>
      </div>
    </div>
  );
}
