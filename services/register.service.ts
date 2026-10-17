

import { AxiosInstance } from "axios";
import { RegisterInput } from "@/types";

export const registerService = async (payload: RegisterInput, axiosInstance: AxiosInstance) => {
    const response = await axiosInstance.post("/auth/register", payload)
    return response?.data
};
