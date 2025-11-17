import { useState } from "react";
import Form from "../ui/Form/Form"; // הרכיב Form שעשינו קודם
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { LoginData } from "../../hooks/useLogin";

interface LoginFormProps {
  onSubmit: ({ username, password } : LoginData) => void;
  loading: boolean;
  error?: string;
}

const LoginForm = ({ onSubmit, loading = false, error }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({username, password});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="form-group">
        <label>username</label>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </Form>
  );
};

export default LoginForm;