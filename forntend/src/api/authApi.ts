import client from "./client";
import { LoginData } from "../hooks/useLogin";
import { SignupData } from "../hooks/useSignup";
import { User } from "./adminApi";

interface AuthResponse {
  token: string;
  user: User;
}

export const fetchLogin = async ({ email, password }: LoginData) => {
  return client.post<AuthResponse>("/auth/login", { email, password }) as unknown as Promise<AuthResponse>;
};

export const fetchsignup = async ({ email, password, name }: SignupData) => {
  return client.post<AuthResponse>("/auth/register", { email, name, password }) as unknown as Promise<AuthResponse>;
};