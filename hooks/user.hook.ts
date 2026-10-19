import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { UserErrorResponse, UserSuccessResponse } from "@/types";
import { userService } from "@/services/user.service";
import { AxiosError } from "axios";

// Helper to read cookie by name on client side
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
};

export const useUser = () => {
  const axiosInstance = api;
  const tokenName = process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";
  const token = typeof window !== "undefined" ? getCookie(tokenName) : null;

  const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery<
    UserSuccessResponse,
    AxiosError<UserErrorResponse>
  >({
    queryKey: ["user"],
    queryFn: () => userService(axiosInstance),
    enabled: !!token,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

    return {
        user: data,
        isLoading,
        isError,
        error,
        isFetching,
        isSuccess,
    };
}