import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login({ setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [activeRole, setActiveRole] = useState("hr"); 
  
    // Save the username to localStorage
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (isSignup) {
    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          email,
          role: activeRole,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Signup successful");
        setUsername("");
        setPassword("");
        setEmail("");
        setIsSignup(false);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error during signup");
    }
  } else {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          role: activeRole,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // Check if user’s role matches the active role
        if (data.role !== activeRole) {
          setError("You are not allowed to login to this page");
          return;
        }

        alert("Login successful!");
        setIsLoggedIn(true);
        setUserRole(data.role);
        localStorage.setItem("user_id", username);

        if (data.role === "hr") {
          navigate("/hr-landing");
        } else if (data.role === "employee") {
          navigate("/employee-landing");
        } else {
          setError("Invalid role");
        }
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error during login");
    }
  }
};

  return (
    
    <div className="login-container"
    >
      <div className="role-toggle">
        <button
          className={activeRole === "hr" ? "active" : ""}
          onClick={() => setActiveRole("hr")}
        >
          HR
        </button>
        <button
          className={activeRole === "employee" ? "active" : ""}
          onClick={() => setActiveRole("employee")}
        >
          Employee
        </button>
      </div>

      <h2>{isSignup ? "Signup" : "Login"} ({activeRole})</h2>

      <form onSubmit={handleSubmit} className="form">
        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          className="link-btn"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
}
