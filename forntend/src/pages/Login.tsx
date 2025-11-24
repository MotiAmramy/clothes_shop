import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LogginForm/LogginForm";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";



const Login = () => {
  const { login, loading, error, success } = useLogin();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  const handleSubmitRegister = () => navigate("/signup")

  return (
    <div className="login-page">
      <LoginForm onSubmit={login} loading={loading} error={error} SubmitRegister={handleSubmitRegister}/>
    </div>
  );
};


export default Login;
