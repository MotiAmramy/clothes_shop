import { useState } from "react";
import Form from "../ui/Form/Form";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";

interface SignupFormProps {
  onSubmit: (email: string, password: string, name: string) => void;
  loading?: boolean;
  error?: string | null;
}

const SignupForm = ({ onSubmit, loading = false, error }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password, name);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div className="form-group">
        <label>Name</label>
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignupForm;
