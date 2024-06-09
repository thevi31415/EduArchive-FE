import React, { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userData, setUserData] = useState(null);
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
      setUserData(data.data); //
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
        {userData && (
          <div>
            <h3>User Information</h3>
            <p>ID: {userData.id}</p>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            {/* Add other user data fields as needed */}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
