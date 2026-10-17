import api from "@/lib/axios"
import { registerService } from "@/services/register.service"
import { RegisterInput } from "@/types"
import { useMutation } from "@tanstack/react-query"

export const useRegister = () => {

    const axiosInstance = api


    const {
        mutateAsync: register,
        isPending,
        data,
    } = useMutation({
        mutationKey: ["register"],
        mutationFn: (payload: RegisterInput) => registerService(payload, axiosInstance),
    })

    return {
        register,
        isPending,
        data,
    }
}