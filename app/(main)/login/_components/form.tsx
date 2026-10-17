"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FiMail, FiLock } from "react-icons/fi";
import { message } from "antd";
import CommonFieldset from "@/components/fieldset";
import { LoginPayload } from "@/types";
import { useLogin } from "@/hooks/login.hook";

export default function LoginForm() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { login, isPending } = useLogin();

  const onSubmit = (data: LoginPayload) => {
    login(data, {
      onSuccess: (response) => {
        messageApi.success(response?.message || "Logged in successfully!");
        router.push("/dashboard");
      },
      onError: (error) => {
        const responseData = error.response?.data;
        const errorData = responseData?.errors;

        if (errorData && errorData.length > 0) {
          errorData.forEach((err) => {
            setError(err.field as keyof LoginPayload, {
              type: "server",
              message: err.message,
            });
          });
        } else {
          messageApi.error(responseData?.message || "Invalid email or password");
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {contextHolder}

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
        innerWrapper="border-2 border-black rounded-none shadow-[2px_2px_0px_#000] focus-within:ring-0 focus-within:border-black"
        labelClass="font-black uppercase text-xs"
        inputClass="font-bold text-sm"
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
        innerWrapper="border-2 border-black rounded-none shadow-[2px_2px_0px_#000] focus-within:ring-0 focus-within:border-black"
        labelClass="font-black uppercase text-xs"
        inputClass="font-bold text-sm"
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#facc15] border-[2.5px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none mt-2 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "SIGNING IN..." : "SIGN IN"}
      </button>
    </form>
  );
}
