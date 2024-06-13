import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve userId, idGoogle, and token from localStorage
    const userId = localStorage.getItem("userId");
    const idGoogle = localStorage.getItem("idGoogle");
    const token = localStorage.getItem("token");

    // Check if userId, idGoogle, or token is missing
    if (!userId || !idGoogle || !token) {
      navigate("/login"); // Redirect to login if any of these are missing
      return;
    }

    // Fetch user data using Bearer token for authentication
    fetch(`${API_BASE_URL}/api/User/${userId}/${idGoogle}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  if (!user) {
    return <div>Loading...{user?.id}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("idGoogle");
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove userId from localStorage
    // Remove userId from localStorage
    // Remove userId from localStorage
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <div>
      <div>
        <h1>User Details</h1>
        <p>
          <strong>Name:</strong> {user.id}
        </p>
        <p>
          <strong>Username:</strong> {user.userName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Introduction:</strong> {user.introduction}
        </p>
        <p>
          <strong>Armorial:</strong> {user.armorial}
        </p>
        <p>
          <strong>Avatar:</strong> <img src={user.avartar} alt="Avatar" />
        </p>
        <p>
          <strong>Organization:</strong> {user.organization}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Created Date:</strong>{" "}
          {new Date(user.createdDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Visit:</strong>{" "}
          {new Date(user.lastVisit).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {user.status === 1 ? "Active" : "Inactive"}
        </p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:py-2 md:text-lg md:px-5"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Profile;
