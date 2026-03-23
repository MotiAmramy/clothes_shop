import { useState } from "react";
import Form from "../../ui/Form/Form";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";

interface SignupFormProps {
  onSubmit: (email: string, password: string, name: string) => void;
  loading?: boolean;
  error?: string | null;
}

const SignupForm = ({ onSubmit, loading = false, error }: SignupFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }
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
        <div style={{ position: "relative" }}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", padding: 0 }}
          >
            {showPassword ? "🐵" : "🙈"}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Confirm Password</label>
        <div style={{ position: "relative" }}>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "1rem", padding: 0 }}
          >
            {showConfirmPassword ? "🐵" : "🙈"}
          </button>
        </div>
      </div>

      {(formError || error) && <p className="error">{formError || error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignupForm;
