import { LoginData } from "../hooks/useLogin";
import { SignupData } from "../hooks/useSignup";

const API_LOGIN_URL = "http://localhost:5000/api/auth/login";

export const fetchLogin = async ({ email, password }: LoginData) => {
  const res = await fetch(API_LOGIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => {
    throw new Error("Invalid JSON from server");
  });

  console.log(data);
  

  if (!res.ok) {
    throw new Error(data?.error || "Login failed");
  }

  return data;
};

const API_SIGNUP_URL = "http://localhost:5000/api/auth/register";


export const fetchsignup = async ({ email, password, name }: SignupData) => {
  const res = await fetch(API_SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json().catch(() => {
        throw new Error("Invalid response from server");
      });

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // בדיקה שהשרת מחזיר user תקין
      if (!data.user) {
        throw new Error("User data missing in response");
      }
      return data;
    }