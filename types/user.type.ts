export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface UserSuccessResponse {
  success: boolean;
  message: string;
  data: { user: User };
  status: number;
}

export interface UserErrorResponse {
  success: boolean;
  message: string;
  error: string;
  status: number;
}



