import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToKen] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (token) {
      localStorage.setItem("Token", token);
    }
  }, [token]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("User", JSON.stringify(user));
    }
  }, [user]);
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
        showToastMessage2();
      }
      // toast.success("Success Notification !", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
      const data = await response.json();
      // setUser(data[0].data);
      setSuccessMessage("Login successful!");
      // Do something with the data if needed
      setToKen(data.data.token); //
      setUser(data.data.user);
      localStorage.setItem("Token", token);
      showToastMessage();
      <Navigate to="/" />;
    } catch (error) {
      showToastMessage2();

      console.error("Error logging in:", error);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  const showToastMessage = () => {
    toast.success("Đăng nhập thành công !");
  };
  const showToastMessage2 = () => {
    toast.error("Không thể đăng nhập !");
  };
  return (
    <div className=" flex items-center justify-center bg-gray-50 py-20 px-5 sm:px-6 lg:px-8">
      <div
        className="max-w-md  space-y-8"
        style={{ width: "70%", margin: "20px" }}
      >
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold"
            style={{ color: "#02FBA3" }}
          >
            Đăng nhập
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          {successMessage && (
            <p className="mt-2 text-center text-sm text-green-600">
              {successMessage}
            </p>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="email-address" className="sr-only">
                Địa chỉ Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <span className="flex items-center space-x-2">
                <i className="fa-solid fa-right-to-bracket fa-lg"></i>
                <span>Đăng nhập</span>
              </span>
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
