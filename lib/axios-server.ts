import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const ACCESS_TOKEN_NAME =
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || "access_token";
const REFRESH_TOKEN_NAME =
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || "refresh_token";

/**
 * Server-side private Axios instance
 * For use strictly in Server Components, Server Actions, and Route Handlers.
 * In Next.js 15/16, cookies() is asynchronous and must be awaited.
 */
export async function axiosPrivateServer(): Promise<AxiosInstance> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_TOKEN_NAME)?.value ?? null;

  const instance = axios.create({
    baseURL: `${baseURL}/api`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      Cookie: cookieStore.toString(),
    },
    timeout: 15000,
  });

  // Response Interceptor: Server-Side Token Refresh & Retry
  instance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

        if (refreshToken) {
          try {
            // ১. সরাসরি /api/auth/refresh কল করে নতুন টোকেন নেওয়া
            const refreshRes = await axios.post(
              `${baseURL}/api/auth/refresh`,
              { refreshToken },
              {
                headers: {
                  Cookie: cookieStore.toString(),
                },
              }
            );

            const newAccessToken =
              refreshRes.data?.data?.tokens?.access_token;

            if (newAccessToken) {
              // ২. মূল রিকোয়েস্টে নতুন Bearer টোকেন বসিয়ে পুনরায় এক্সিকিউট করা
              originalRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);
              return instance(originalRequest);
            }
          } catch (refreshErr) {
            console.error("Server-side token refresh failed:", refreshErr);
          }
        }

        // রিফ্রেশ ব্যর্থ হলে লগইনে রিডাইরেক্ট
        try {
          cookieStore.delete(ACCESS_TOKEN_NAME);
          cookieStore.delete(REFRESH_TOKEN_NAME);
        } catch {
          // Server Component render-এ ডিলিট ব্লক হলে ক্যাচ করবে
        }
        redirect("/login");
      }

      return Promise.reject(error);
    }
  );

  return instance;
}

export default axiosPrivateServer;
