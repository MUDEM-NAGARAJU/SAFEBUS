import { useState } from "react";

export default function PasswordInput({ placeholder, value, onChange, className = "login-input" }) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        className={className}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ paddingRight: 40, width: "100%", boxSizing: "border-box" }}
      />
      <span
        onClick={() => setVisible((v) => !v)}
        style={{
          position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
          cursor: "pointer", userSelect: "none", fontSize: 16, color: "#94a3b8",
        }}
        title={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          // eye-off icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.94 10.94 0 0112 20c-7 0-11-8-11-8a20.3 20.3 0 015.06-6.06M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a20.3 20.3 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          // eye icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </span>
    </div>
  );
}