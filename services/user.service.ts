import { AxiosInstance } from "axios";
import { UserSuccessResponse } from "@/types";

export const userService = async (
  axiosInstance: AxiosInstance
): Promise<UserSuccessResponse> => {
  const response = await axiosInstance.get<UserSuccessResponse>("/auth/me", {
    withCredentials: true,
  });
  return response?.data;
};
