import { AxiosInstance } from "axios";
import { LoginPayload, LoginSuccessResponse } from "@/types";

export const loginService = async (
  payload: LoginPayload,
  axiosInstance: AxiosInstance
): Promise<LoginSuccessResponse> => {
  const response = await axiosInstance.post<LoginSuccessResponse>(
    "/auth/login",
    payload
  );
  return response?.data;
};
