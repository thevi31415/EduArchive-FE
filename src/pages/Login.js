import React, { useState, useEffect } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToKen] = useState(null);
  useEffect(() => {
    if (token) {
      localStorage.setItem("Token", token);
    }
  }, [token]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/User/login?email=${email}&password=${password}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            // Add other headers if needed
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      // setUser(data[0].data);
      setSuccessMessage("Login successful!");
      // Do something with the data if needed
      setToKen(data.data); //
      localStorage.setItem("Token", token);
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
        {token && (
          <div>
            <h3>Token: {token}</h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
