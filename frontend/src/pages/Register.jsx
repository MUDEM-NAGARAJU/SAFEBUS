import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/login.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onlyLetters = (v) => v.replace(/[^A-Za-z]/g, "");
  const onlyDigits = (v) => v.replace(/\D/g, "").slice(0, 10);
  const usernameChars = (v) => v.replace(/[^A-Za-z0-9_.@+-]/g, "");

  const validate = () => {
    if (!username.trim()) return "Username is required.";
    if (!/[A-Za-z]/.test(username)) return "Username must contain at least one letter.";
    if (!first_name) return "First name is required.";
    if (!last_name) return "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (phone_number.length !== 10) return "Phone number must be exactly 10 digits.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return "Password must contain at least one letter and one number.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await API.post("accounts/register/", {
        username, first_name, last_name, email, phone_number, password,
      });

      alert("Registration successful 🚀 Please login");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Registration failed"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Register</h2>
        <form className="login-form" onSubmit={handleRegister}>
          <input
            className="login-input" placeholder="Username (letters, numbers, . _ @ + -)"
            value={username} onChange={(e) => setUsername(usernameChars(e.target.value))}
          />
          <input
            className="login-input" placeholder="First Name"
            value={first_name} onChange={(e) => setFirstName(onlyLetters(e.target.value))}
          />
          <input
            className="login-input" placeholder="Last Name"
            value={last_name} onChange={(e) => setLastName(onlyLetters(e.target.value))}
          />
          <input
            className="login-input" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input" placeholder="Phone Number (10 digits)"
            value={phone_number} onChange={(e) => setPhoneNumber(onlyDigits(e.target.value))}
          />
          <input
            className="login-input" type="password" placeholder="Password (min 8, 1 letter, 1 number)"
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="login-input" type="password" placeholder="Confirm Password"
            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="login-button" type="submit">Register</button>
          {error && <p className="login-error">{error}</p>}
        </form>
        <p className="login-register-text">
          Already have an account?{" "}
          <span className="login-register-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}