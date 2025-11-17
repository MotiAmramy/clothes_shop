import { useState } from "react";
import { useAuthStore } from "../store/logginStore";

export interface LoginData {
  username: string;
  password: string;
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const API_URL = "http://localhost:5000/api/login";

// פונקציה טהורה שמבצעת את ה-request
const fetchLogin = async ({username, password}: LoginData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json().catch(() => {
    throw new Error("Invalid JSON from server");
  });

  if (!res.ok) {
    throw new Error(data?.message || "Login failed");
  }

  // בדיקות הגנה
  // if (!data?.user || !data.user.id || !data.user.email) {
  //   throw new Error("Malformed response from server");
  // }

  return data;
};

const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { login: setAuthUser } = useAuthStore();

  const login = async ({ username, password }: LoginData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await fetchLogin({username, password});

      // עדכון ה-store
      setAuthUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      setSuccess(true);

    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
