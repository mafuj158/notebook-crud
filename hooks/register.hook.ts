import api from "@/lib/axios";
import { registerService } from "@/services/register.service";
import {
  RegisterErrorResponse,
  RegisterPayload,
  RegisterSuccessResponse,
} from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRegister = () => {
  const axiosInstance = api;

  const {
    mutate: register,
    mutateAsync: registerAsync,
    isPending,
    data,
  } = useMutation<
    RegisterSuccessResponse,
    AxiosError<RegisterErrorResponse>,
    RegisterPayload
  >({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterPayload) =>
      registerService(payload, axiosInstance),
  });

  return {
    register,
    registerAsync,
    isPending,
    data,
  };
};