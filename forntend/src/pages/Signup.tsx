import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm/SignupForm";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, loading, error, success } = useSignup();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <SignupForm
      onSubmit={(email, password, name) => signup({ email, password, name })}
      loading={loading}
      error={error}
    />
  );
};

export default Signup;