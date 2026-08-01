import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("accounts/login/", { username, password });
      login(res.data);

      const redirectTo = location.state?.from?.pathname;
      if (redirectTo) {
        navigate(redirectTo + (location.state.from.search || ""));
      } else {
        navigate(res.data.is_staff ? "/admin" : "/search");
      }
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">SAFEBUS Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input className="login-input" type="text" placeholder="Username"
            value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="login-input" type="password" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="login-button" type="submit">Login</button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <p className="login-register-text">
          <span className="login-register-link" onClick={() => navigate("/forgot-password")}>
            Forgot password?
          </span>
        </p>
        <p className="login-register-text">
          New user?{" "}
          <span className="login-register-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}