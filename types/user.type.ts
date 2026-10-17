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

export interface LoginInput {
  email: string;
  password: string;
}

