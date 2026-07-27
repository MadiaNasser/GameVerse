import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("gameverseUser") || "null"
    );

    if (!savedUser) {
      setMessage("No account found. Please create an account.");
      return;
    }

    if (
      savedUser.email === email &&
      savedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setMessage("");
      navigate("/profile");
    } else {
      setMessage("Email or password is incorrect.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-back">
          ← Back to Home
        </Link>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          Login to your GameVerse account
        </p>

        <form onSubmit={handleLogin} className="auth-form">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {message && <p className="auth-message">{message}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;