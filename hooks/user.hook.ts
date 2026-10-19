import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { UserErrorResponse, UserSuccessResponse } from "@/types";
import { userService } from "@/services/user.service";
import { AxiosError } from "axios";

export const useUser = () => {
    const axiosInstance = api;

    const { data, isLoading, isError, error, isFetching, isSuccess } = useQuery<UserSuccessResponse, AxiosError<UserErrorResponse>>({
        queryKey: ["user"],
        queryFn: () => userService(axiosInstance),
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