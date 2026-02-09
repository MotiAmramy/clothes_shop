import { useState } from "react";
import { useAuthStore } from "../store/logginStore";
import { fetchsignup } from "../api/authApi";

export interface SignupData {
  email: string;
  name: string;
  password: string;
}


/**
 * Custom hook for handling user registration.
 * Sends registration data to the API and automatically logs the user in on success.
 */
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
      const data = await fetchsignup({ name, email, password });
      // שמירת המשתמש בגלובלי
      setAuthUser({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
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
