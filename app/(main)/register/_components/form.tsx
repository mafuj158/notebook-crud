"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiAlertCircle, FiCheck } from "react-icons/fi";
import CommonFieldset from "@/components/fieldset";
import { RegisterPayload } from "@/types";
import { useRegister } from "@/hooks/register.hook";

const Form = () => {
    const router = useRouter();
    const [generalError, setGeneralError] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<RegisterPayload>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "onBlur",
    });
    const { register, isPending } = useRegister();


    const onSubmit = (data: RegisterPayload) => {
        setGeneralError("");
        setSuccessMsg("");

        register(data, {
            onSuccess: (response) => {
                setSuccessMsg(response?.message || "Account created successfully!");
                router.push("/dashboard");
            },
            onError: (error) => {
                const responseData = error.response?.data;
                const errorData = responseData?.errors;

                if (errorData && errorData.length > 0) {
                    errorData.forEach((err) => {
                        setError(err.field as keyof RegisterPayload, {
                            type: "server",
                            message: err.message,
                        });
                    });
                } else {
                    setGeneralError(responseData?.message || "Something went wrong");
                }
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Success Notification */}
            {successMsg && (
                <div className="bg-[#22c55e] border-2 border-black p-3 font-bold text-xs text-white shadow-[2px_2px_0px_#000] flex items-center gap-2">
                    <FiCheck className="text-base" />
                    <span>{successMsg} Redirecting to dashboard...</span>
                </div>
            )}

            {/* General Server Error */}
            {generalError && (
                <div className="bg-[#fb7185] border-2 border-black p-3 font-bold text-xs text-black shadow-[2px_2px_0px_#000] flex items-center gap-2">
                    <FiAlertCircle className="text-base" />
                    <span>{generalError}</span>
                </div>
            )}

            {/* Full Name Field */}
            <CommonFieldset
                control={control}
                register_as="name"
                type="text"
                label="Full Name"
                placeholder="Sumit Saha"
                icon={<FiUser className="text-zinc-600 text-base" />}
                errors={errors}
                isRequired
                validationRules={{
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                }}
                innerWrapper="border-2 border-black rounded-none shadow-[2px_2px_0px_#000] focus-within:ring-0 focus-within:border-black"
                labelClass="font-black uppercase text-xs"
                inputClass="font-bold text-sm"
            />

            {/* Email Address Field */}
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
                    required: "Email address is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                    },
                }}
                innerWrapper="border-2 border-black rounded-none shadow-[2px_2px_0px_#000] focus-within:ring-0 focus-within:border-black"
                labelClass="font-black uppercase text-xs"
                inputClass="font-bold text-sm"
            />

            {/* Password Field */}
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
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                }}
                innerWrapper="border-2 border-black rounded-none shadow-[2px_2px_0px_#000] focus-within:ring-0 focus-within:border-black"
                labelClass="font-black uppercase text-xs"
                inputClass="font-bold text-sm"
            />

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#22c55e] border-[2.5px] border-black py-2.5 font-black text-sm uppercase shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none mt-2 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isPending ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
        </form>
    );
};

export default Form;