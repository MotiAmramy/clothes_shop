import { useState } from "react";
import { useAuthStore } from "../store/logginStore";
import { fetchLogin } from "../api/authApi";
import useCartStore from "../store/cartStore";

export interface LoginData {
  email: string;
  password: string;
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}



const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { login: setAuthUser } = useAuthStore();

  const login = async ({ email, password }: LoginData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const data = await fetchLogin({ email, password });

      setAuthUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      });

      setSuccess(true);
      useCartStore.getState().loadCart();

    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, success };
};

export default useLogin;
