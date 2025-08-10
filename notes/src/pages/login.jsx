import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!inputData.email || !inputData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(inputData);
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              boxSizing: "border-box"
            }}
          />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            name="password"
            value={inputData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              margin: "4px 0",
              boxSizing: "border-box"
            }}
          />
        </div>
        <br />
        <button 
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}