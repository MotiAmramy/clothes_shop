import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LogginForm/LogginForm";
import useLogin, { LoginData } from "../hooks/useLogin";
import { useEffect } from "react";


const Login = () => {
  const { login, loading, error, success } = useLogin();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (success) {
      navigate("/");
    }
    
    if (error === "USER_NOT_FOUND") {
      navigate("/signup");
    }
  }, [success, error, navigate]);
  
  const HandleSubmit = ({ username, password }: LoginData) => login({ username, password })


  return (
    <LoginForm
      onSubmit={HandleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default Login;
