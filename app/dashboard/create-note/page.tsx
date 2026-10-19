"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiEdit3, FiTag, FiFileText } from "react-icons/fi";
import CommonFieldset from "@/components/fieldset";
import axios from "axios";

interface NoteFormData {
  title: string;
  tags: string;
  content: string;
}

export default function CreateNotePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormData>({
    defaultValues: {
      title: "",
      tags: "",
      content: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: NoteFormData) => {
    try {
      setLoading(true);
      setErrorMsg("");

      const tagsArray = data.tags
        .split(",")
        .map((t) => t.trim().toUpperCase())
        .filter(Boolean);

      const res = await axios.post("/api/notes", {
        title: data.title,
        content: data.content,
        tags: tagsArray,
      });

      if (res.data?.success) {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.error || err.response?.data?.message || "Failed to create note");
      } else {
        setErrorMsg("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 font-bold text-xs uppercase shadow-[2px_2px_0px_#000] mb-6 hover:bg-zinc-100 transition-all"
      >
        <FiArrowLeft /> Back to Dashboard
      </Link>

      <div className="bg-white border-[3.5px] border-black p-6 md:p-8 shadow-[6px_6px_0px_#000]">
        <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Create Note</h1>
        <p className="text-xs font-bold text-zinc-600 uppercase mb-6">
          Write your note title, tags, and content
        </p>

        {errorMsg && (
          <div className="bg-[#fb7185] border-2 border-black p-3 font-bold text-xs text-black shadow-[2px_2px_0px_#000] mb-4">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Note Title */}
          <CommonFieldset
            control={control}
            register_as="title"
            type="text"
            label="Note Title"
            placeholder="e.g. RESOLVE HYDRATION MISMATCHES"
            icon={<FiEdit3 className="text-zinc-600 text-base" />}
            errors={errors}
            isRequired
            validationRules={{
              required: "Title is required",
            }}
          />

          {/* Tags */}
          <CommonFieldset
            control={control}
            register_as="tags"
            type="text"
            label="Tags (Comma separated)"
            placeholder="FRONTEND, PRISMA, DATABASE"
            icon={<FiTag className="text-zinc-600 text-base" />}
            errors={errors}
          />

          {/* Content */}
          <CommonFieldset
            control={control}
            register_as="content"
            type="textarea"
            label="Note Content"
            placeholder="Write note documentation or code explanation..."

            errors={errors}
            isRequired
            validationRules={{
              required: "Content is required",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#22c55e] border-[2.5px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none mt-2 cursor-pointer transition-all disabled:opacity-60"
          >
            {loading ? "SAVING NOTE..." : "SAVE NOTE"}
          </button>
        </form>
      </div>
    </div>
  );
}
