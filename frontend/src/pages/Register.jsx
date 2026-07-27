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
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

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
          <input className="login-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input className="login-input" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <input className="login-input" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          <input className="login-input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="login-input" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
          <input className="login-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
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