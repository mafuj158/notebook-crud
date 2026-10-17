"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiAlertCircle, FiCheck } from "react-icons/fi";
import CommonFieldset from "@/components/fieldset";
import { LoginInput } from "@/types";
import api from "@/lib/axios";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await api.post("/auth/login", data);
      if (res.data?.success) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.error || err.response?.data?.message || "Invalid credentials");
      } else {
        setErrorMsg("Failed to log in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {successMsg && (
        <div className="bg-[#22c55e] border-[2px] border-black p-3 font-bold text-xs text-white shadow-[2px_2px_0px_#000] flex items-center gap-2">
          <FiCheck className="text-base" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="bg-[#fb7185] border-[2px] border-black p-3 font-bold text-xs text-black shadow-[2px_2px_0px_#000] flex items-center gap-2">
          <FiAlertCircle className="text-base" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Email */}
      <CommonFieldset
        control={control}
        register_as="email"
        type="email"
        label="Email Address"
        placeholder="name@example.com"
        icon={<FiMail className="text-zinc-600 text-base" />}
        errors={errors}
        isRequired
        validationRules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
          },
        }}
      />

      {/* Password */}
      <CommonFieldset
        control={control}
        register_as="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        icon={<FiLock className="text-zinc-600 text-base" />}
        errors={errors}
        isRequired
        validationRules={{
          required: "Password is required",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#facc15] border-[2.5px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 mt-2 cursor-pointer transition-all disabled:opacity-60"
      >
        {loading ? "SIGNING IN..." : "SIGN IN"}
      </button>
    </form>
  );
}
