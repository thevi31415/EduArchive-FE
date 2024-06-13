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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem("token");
    return savedToken ? savedToken : null;
  });

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
          setUser(apiData.data.user);
          setToken(apiData.data.token);
          localStorage.setItem("user", JSON.stringify(apiData.data.user));
          localStorage.setItem("token", apiData.data.token);
          toast.success(apiData.message);
          navigate(`/user/${apiData.data.user.userName}`);
        } else {
          toast.error("Đăng nhập thất bại.");
        }
      } catch (error) {
        console.error("API call failed:", error);
        toast.error("Đăng nhập thất bại.");
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const logOut = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {user ? (
        <div>
          <img src={user.avatar} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
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
