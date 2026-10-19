import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Extend config to allow custom _retry flag
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface FailedRequestQueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

const getBaseURL = (): string => {
  if (typeof window !== "undefined") {
    return "/api";
  }
  return process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api`
    : "http://localhost:3000/api";
};

/**
 * Client-side Axios instance
 * Automatically sends and receives httpOnly cookies (withCredentials: true).
 */
export const api: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

// Refresh state variables for request concurrency
let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

// Response Interceptor: Silent Token Refresh Queue
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

    // Check if error is 401 Unauthorized and config exists
    if (error.response?.status === 401 && originalRequest) {
      const requestUrl = originalRequest.url || "";

      // 1. যদি রিকোয়েস্টটি নিজেই /auth/refresh বা /auth/login হয়, তবে রিফ্রেশ লুপ এড়াতে সরাসরি লগইনে পাঠাবে
      if (requestUrl.includes("/auth/refresh") || requestUrl.includes("/auth/login")) {
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          if (!currentPath.startsWith("/login") && !currentPath.startsWith("/register")) {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
        }
        return Promise.reject(error);
      }

      // 2. যদি ইতিমধ্যে একবার রিফ্রেশ চেষ্টা করা হয়ে থাকে (_retry: true), তবে আর লুপ না চালিয়ে লগইনে পাঠাবে
      if (originalRequest._retry) {
        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isMeRequest = requestUrl.includes("/auth/me");
          const isPublicPage = !currentPath.startsWith("/dashboard");

          if (!(isMeRequest && isPublicPage)) {
            if (!currentPath.startsWith("/login") && !currentPath.startsWith("/register")) {
              window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            }
          }
        }
        return Promise.reject(error);
      }

      // 3. যদি ইতিমধ্যে অন্য কোনো রিকোয়েস্টের কারণে রিফ্রেশ প্রসেস চলমান থাকে (isRefreshing === true)
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // 4. প্রথম রিকোয়েস্ট হিসেবে রিফ্রেশ প্রসেস শুরু করা
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // ফ্রেশ axios কল যাতে এই রিকোয়েস্ট আবার ইন্টারসেপ্টরে না পড়ে
        await axios.post(
          `${getBaseURL()}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        // রিফ্রেশ সফল হয়েছে! কিউতে জমে থাকা সব স্থগিত রিকোয়েস্ট এক্সিকিউট করা
        processQueue(null);

        // মূল (অরিজিনাল) রিকোয়েস্টটি পুনরায় কল করা
        return api(originalRequest);
      } catch (refreshError) {
        // রিফ্রেশ টোকেনও মেয়াদোত্তীর্ণ বা ইনভ্যালিড হলে কিউ বাতিল করা ও লগইনে পাঠানো
        processQueue(refreshError);

        if (typeof window !== "undefined") {
          const currentPath = window.location.pathname;
          const isMeRequest = requestUrl.includes("/auth/me");
          const isPublicPage = !currentPath.startsWith("/dashboard");

          if (!(isMeRequest && isPublicPage)) {
            if (!currentPath.startsWith("/login") && !currentPath.startsWith("/register")) {
              window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            }
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
