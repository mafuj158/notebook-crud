import { User } from "./user.type";

export interface ValidationErrorItem {
    field: string;
    message: string;
}

export interface RegisterSuccessResponse {
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

export interface RegisterErrorResponse {
    success: boolean;
    message: string;
    errors?: ValidationErrorItem[];
    status: number;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}