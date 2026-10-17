export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

export interface AuthError {
  code?: string;
  message: string;
  fields?: Record<string, string>;
}

export interface AuthResponse {
  user?: User;
  message?: string;
}
