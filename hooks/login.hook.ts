import api from "@/lib/axios";
import { loginService } from "@/services/login.service";
import {
  LoginErrorResponse,
  LoginPayload,
  LoginSuccessResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () => {
  const axiosInstance = api;

  const {
    mutate: login,
    mutateAsync: loginAsync,
    isPending,
    data,
  } = useMutation<
    LoginSuccessResponse,
    AxiosError<LoginErrorResponse>,
    LoginPayload
  >({
    mutationKey: ["login"],
    mutationFn: (payload: LoginPayload) =>
      loginService(payload, axiosInstance),
  });

  return {
    login,
    loginAsync,
    isPending,
    data,
  };
};
