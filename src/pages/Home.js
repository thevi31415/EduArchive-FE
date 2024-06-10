import Slider from "../component/Slider";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [users, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Retrieve the token from session storage
    const storedToken = localStorage.getItem("Token");
    setToken(storedToken);

    const fetchUsers = async (authToken) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUser(data.data);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    // Only fetch users if token is available
    if (storedToken) {
      fetchUsers(storedToken);
    }
  }, []); // Only re-run the effect if API_BASE_URL changes

  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-gray-50">Trang chủ</h1>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/user/${user.id}`}>{user.userName}</Link>
        </div>
      ))}
      <div>
        <h2>User Profile upate: {token}</h2>
      </div>
    </div>
  );
}

export default Home;
