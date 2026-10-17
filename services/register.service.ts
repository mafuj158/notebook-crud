

import { AxiosInstance } from "axios";
import { RegisterPayload } from "@/types";

export const registerService = async (payload: RegisterPayload, axiosInstance: AxiosInstance) => {
    const response = await axiosInstance.post("/auth/register", payload)
    return response?.data
};
