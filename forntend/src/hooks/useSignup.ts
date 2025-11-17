import { useState } from "react";
import { useAuthStore } from "../store/logginStore";

interface SignupData {
  email: string;
  name: string;
  password: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { login: setAuthUser } = useAuthStore(); // עדכון הסטייט הגלובלי

  const signup = async ({ email, password, name }: SignupData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
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

      // שמירת המשתמש בגלובלי
      setAuthUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    loading,
    error,
    success,
  };
};

export default useSignup;
