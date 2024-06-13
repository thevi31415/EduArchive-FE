import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
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
          localStorage.setItem("idGoogle", apiData.data.user.idGoogle);
          localStorage.setItem("token", apiData.data.token);
          toast.success(apiData.message);
          navigate(`/profile`);
        } else {
          toast.error("Đăng nhập thất bại.");
        }
      } catch (error) {
        console.error("API call failed:", error);
        toast.error("Đăng nhập thất bại." + error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
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

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {userId ? (
        <div>
          {/* Display user information if logged in */}
          <h3>User Logged in</h3>
          {/* You can optionally display user avatar and other details */}
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
