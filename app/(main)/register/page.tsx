import Link from "next/link";
import Form from "./_components/form";

export default function RegisterPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center py-16 px-4">
      {/* Register Card */}
      <div className="w-full max-w-md bg-white border-[3.5px] border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        <h1 className="font-black text-2xl uppercase tracking-tight mb-2">REGISTER</h1>
        <p className="text-xs font-bold text-zinc-600 uppercase mb-6">
          Create an account to start writing notes
        </p>

        <Form />

        <div className="mt-6 pt-4 border-t-2 border-zinc-200 text-center text-xs font-bold">
          <span>Already have an account? </span>
          <Link href="/login" className="underline font-black text-black hover:text-zinc-700">
            LOGIN HERE
          </Link>
        </div>
      </div>
    </div>
  );
}
