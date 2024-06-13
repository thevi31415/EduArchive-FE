import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  //Login with Google
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [idGoogle, setIdGoogle] = useState(
    localStorage.getItem("idGoogle") || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const profileRes = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const profileData = profileRes.data;

        const apiRes = await axios.get(`${API_BASE_URL}/api/User/logingoogle`, {
          params: {
            idGoogle: profileData.id,
            email: profileData.email,
            userName: profileData.name,
            Avatar: profileData.picture,
          },
        });

        const apiData = apiRes.data;
        if (apiData.status) {
          setUserId(apiData.data.user.id);
          setIdGoogle(apiData.data.user.idGoogle);
          setToken(apiData.data.token);
          localStorage.setItem("userId", apiData.data.user.id);
          localStorage.setItem("userName", apiData.data.user.name);

          localStorage.setItem("idGoogle", apiData.data.user.idGoogle);
          localStorage.setItem("token", apiData.data.token);
          localStorage.setItem("role", apiData.data.user.role);
          toast.success("Đăng nhập thành công!");
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        } else {
          toast.error("Đăng nhập thất bại.");
        }
      } catch (error) {
        console.error("API call failed:", error);
        toast.error("Đăng nhập thất bại." + error);
      }
    },
    onError: (error) => {
      console.log("Login Failed:", error);
      toast.error("Đăng nhập thất bại.");
    },
  });

  const logOut = () => {
    googleLogout();
    setUserId(null);
    setIdGoogle(null);
    setToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("idGoogle");
    localStorage.removeItem("token");
  };

  //Login Email and Password

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
          },
        }
      );

      if (!response.ok) {
        toast.error("Không thể đăng nhập !");
      }

      const data = await response.json();
      if (!data.data) {
        toast.error("Tên đăng nhập hoặc mật khẩu sai !");
      } else {
        setSuccessMessage("Login successful!");
        localStorage.setItem("userId", data.data.user.id);
        localStorage.setItem("idGoogle", data.data.user.idGoogle);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.user.role);
        localStorage.setItem("userName", data.data.user.name);

        showToastMessage();
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };
  const showToastMessage = () => {
    toast.success("Đăng nhập thành công !");
  };

  return (
    <div className="font-[sans-serif] text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center">
        {loading && (
          <ClipLoader
            size={35} // Kích thước của ClipLoader
            color={"#48DA7D"} // Màu sắc của ClipLoader
            loading={loading} // Trạng thái loading của ClipLoader
          />
        )}
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:max-w-md w-full sm:px-6 py-4">
            <form onSubmit={handleLogin}>
              <div className="mb-12">
                <h3
                  className="text-3xl "
                  style={{ fontWeight: "bold", color: "#48DA7D" }}
                >
                  Đăng nhập
                </h3>
                <p className="text-sm mt-4">
                  Bạn chưa có tài khoản ?
                  <a
                    href="javascript:void(0);"
                    className=" font-semibold hover:underline ml-1 whitespace-nowrap"
                    style={{ color: "#48DA7D" }}
                  >
                    Đăng kí tại đây
                  </a>
                </p>
              </div>
              <div>
                <label className="text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter email"
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-8">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter password"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 mt-5">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="javascript:void(0);"
                    className=" font-semibold text-sm hover:underline"
                    style={{ color: "#48DA7D" }}
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-green-400 hover:bg-green-500 focus:outline-none"
                >
                  Đăng nhập
                </button>
              </div>
              <p className="my-8 text-sm text-gray-400 text-center">
                Đăng nhập với Google
              </p>
              <div className="space-x-8 flex justify-center">
                <button
                  type="button"
                  onClick={login}
                  className="border-none outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:block">
            <img
              src="https://res.cloudinary.com/dhs93uix6/image/upload/v1718267670/2151164314_hwt1yi.jpg"
              alt="Placeholder"
              className="w-[600px] h-[600px] object-cover rounded-md"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
