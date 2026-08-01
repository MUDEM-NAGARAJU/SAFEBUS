import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/login.css";
import PasswordInput from "../components/PasswordInput";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("accounts/forgot-password/request-otp/", { email });
      setMessage(res.data.message);
      setStep(2);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setError("Password must be at least 8 characters with a letter and a number.");
      return;
    }

    setLoading(true);
    try {
      await API.post("accounts/forgot-password/reset/", {
        email, otp, new_password: newPassword,
      });
      alert("Password reset successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Forgot Password</h2>

        {step === 1 && (
          <form className="login-form" onSubmit={handleRequestOtp}>
            <p>Enter your registered email. We'll send you a one-time code.</p>
            <input
              className="login-input" type="email" placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required
            />
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </button>
            {error && <p className="login-error">{error}</p>}
          </form>
        )}

        {step === 2 && (
          <form className="login-form" onSubmit={handleReset}>
            <p style={{ color: "green" }}>{message}</p>
            <input
              className="login-input" placeholder="Enter 6-digit OTP"
              value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required
            />
            <PasswordInput placeholder="New Password" 
             value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <PasswordInput placeholder="Confirm New Password" 
             value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
            {error && <p className="login-error">{error}</p>}
          </form>
        )}

        <p className="login-register-text">
          <span className="login-register-link" onClick={() => navigate("/login")}>
            Back to Login
          </span>
        </p>
      </div>
    </div>
  );
}