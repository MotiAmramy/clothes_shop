import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm/SignupForm";
import useSignup from "../hooks/useSignup";


/**
 * Signup Page
 * 
 * Renders the SignupForm component and handles navigation upon successful registration.
 */
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