import { ValidationErrorItem } from "./register.types";
import { User } from "./user.type";

export interface LoginSuccessResponse {
    success: boolean;
    message: string;
    data: {
        user: User
        tokens: {
            access_token: string;
            refresh_token: string;
        };
    };
    status: number;
}

export interface LoginErrorResponse {
    success: boolean;
    message: string;
    errors?: ValidationErrorItem[];
    status: number;
}

export interface LoginPayload {
    email: string;
    password: string;
}