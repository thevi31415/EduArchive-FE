import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/User/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data.data));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
          <strong>Avatar:</strong> <img src={user.avatar} alt="Avatar" />
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
      </div>
    </div>
  );
}

export default UserDetail;
