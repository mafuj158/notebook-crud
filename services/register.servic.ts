import axios from "axios";
import { RegisterInput, ApiResponse, AuthResponseData } from "@/types";

export const registerService = async (
  formData: RegisterInput
): Promise<ApiResponse<AuthResponseData>> => {
  const res = await axios.post<ApiResponse<AuthResponseData>>(
    "/api/auth/register",
    formData
  );
  return res.data;
};
