import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/User/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login"); // Điều hướng về trang đăng nhập sau khi đăng xuất
  };
  return (
    <div>
      <div>
        <h1>User Details</h1>
        <p>
          <strong>Name:</strong> {user.name}
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

export default UserDetail;
